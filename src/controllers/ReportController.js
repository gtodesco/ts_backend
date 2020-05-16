const { literal } = require('sequelize');
const moment = require('moment');
const Sprint = require('../models/Sprint');
const Atividade = require('../models/Atividade');
const Impedimento = require('../models/Impedimento');

module.exports = {
    async getBurndown(req, res) {

        const { sprint_id } = req.query;

        // Busca dados da sprint
        const sprint = await Sprint.findByPk(sprint_id);
        const dt_inicio_sprint = moment(sprint.dt_inicio);
        const dt_fim_sprint = moment(sprint.dt_fim);
        
        // Busca a quantidade total de dias entre a data inicial e final da sprint
        let qtd_dias_sprint = dt_fim_sprint.diff(dt_inicio_sprint, "days") + 1; // Esse + 1 define se a sprint irá durar até o fim do último dia ou não
        
        // Monta as labels de datas que irão abaixo do gráfico
        let arr_labels = [];
        for (i = 0; i < qtd_dias_sprint; i++) {
            let dia = moment(dt_inicio_sprint).add(i, 'd');

            // Desconsidera finais de semana.
            if (dia.isoWeekday() != 6 && dia.isoWeekday() != 7) {
                arr_labels.push(dia.format('DD/MM'));
            }
        }

        // Define a quantidade de dias da sprint de acordo com a quantidade de datas que sobraram ao retirar os finais de semana
        qtd_dias_sprint = arr_labels.length;
        // --------------------------------------------------------------------

        // Query que busca o total de horas da sprint agrupando as atividades e somando as horas previstas
        let total_horas_sprint = await Atividade.findAll({
            attributes: [
                [literal('TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(`horas_previsto`)) MOD (TIME_TO_SEC("838:59:59")+1)), "%H.%i")'), 'total_horas_sprint']
            ],
            where: { sprint_id },
            group: ['sprint_id'],
        });;

        total_horas_sprint = total_horas_sprint[0].get('total_horas_sprint');
        // --------------------------------------------------------------------
        
        // Busca o valor de horas ideal por dia -------------------------------
        const horas_ideal_por_dia = (total_horas_sprint / qtd_dias_sprint).toFixed(2);
        
        // Monta o array de horas ideal por dia
        let arr_horas_ideial_por_dia = [];
        let horas_restantes = total_horas_sprint;
        
        for (i = 0; i < qtd_dias_sprint; i++) {
            arr_horas_ideial_por_dia.push(horas_restantes);
            horas_restantes = (horas_restantes - horas_ideal_por_dia).toFixed(2);
        }
        // --------------------------------------------------------------------

        // Define a data atual ------------------------------------------------
        let hoje = moment();

        // Vai subtraindo até a data sair do final de semana. Irá para o primeiro dia antes do começo do final de semana.
        while(hoje.isoWeekday() == 6 || hoje.isoWeekday() == 7) {
            hoje.subtract(1, 'days');
        }

        hoje = hoje.format('YYYY-MM-DD');
        // --------------------------------------------------------------------

        // Define a quantidade de dias que se passaram até a data atual -------
        let qtd_dias_passados = moment(hoje).diff(dt_inicio_sprint, "days") + 1; // Esse + 1 define se a sprint irá durar até o fim do último dia

        for (i = 0; i < qtd_dias_passados; i++) {
            let dia = moment(dt_inicio_sprint).add(i, 'd');

            // Desconsidera finais de semana.
            if (dia.isoWeekday() == 6 || dia.isoWeekday() == 7) {
                qtd_dias_passados = qtd_dias_passados - 1;
            }
        }
        // --------------------------------------------------------------------

        // Busca dados das atividades -----------------------------------------
        const atividades = await Atividade.findAll({
            where: { 
                sprint_id,
                status_id: 7
            }
        });
        // --------------------------------------------------------------------

        // Monta o array de horas realizadas por dia --------------------------
        let arr_horas_por_dia = [];
        let horas_restantes_atual = total_horas_sprint;
        
        for (i = 0; i < qtd_dias_passados; i++) {
            arr_horas_por_dia.push(horas_restantes_atual);

            let horas_concluidas_dia = 0;

            for(j = 0; j < atividades.length; j++) {

                let dt_conclusao = moment(atividades[j].dt_conclusao);
                
                // Verificação para caso exista uma atividade concluída final de semana
                while (dt_conclusao.isoWeekday() == 6 || dt_conclusao.isoWeekday() == 7) {
                    dt_conclusao = dt_conclusao.subtract(1, 'days');
                }

                // Se a data de conclusão da atividade bater com alguma data da sprint, pega essa posição da data da sprint e atualiza as horas restantes
                if (dt_conclusao.format('DD/MM') == arr_labels[i + 1]) {
                    const arr_horas_previstas = atividades[j].horas_previsto.split(':');
                    const horas_previstas = `${arr_horas_previstas[0]}.${arr_horas_previstas[1]}`;
                    horas_concluidas_dia = horas_concluidas_dia + parseInt(horas_previstas);
                }
            }

            horas_restantes_atual = (horas_restantes_atual - horas_concluidas_dia).toFixed(2);
        }
        // --------------------------------------------------------------------
        
        const retorno = {
            arr_labels,
            arr_horas_ideial_por_dia,
            arr_horas_por_dia
        };

        return res.json(retorno);

    },

    async getImpedimentos(req, res) {
        try {

            const { sprint_id } = req.query;

            let arrImpedimentos = await Impedimento.findAll({
                attributes: [
                    'id', 
                    [literal('TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(`horas`)) MOD (TIME_TO_SEC("838:59:59")+1)), "%H.%i")'), 'total']
                ],
                where: { sprint_id },
                include: {
                    association: 'pessoa',
                    attributes: ['nome']
                },
                group: ['pessoa_id'],
                order: literal('total DESC'),
            });
    
            let arrNomes = [];
            let arrHoras = [];

            for (i = 0; i < arrImpedimentos.length; i++) {
                arrNomes.push(arrImpedimentos[i].pessoa.nome);
                arrHoras.push(arrImpedimentos[i].get('total'));
            };

            const retorno = {
                'nomes': arrNomes,
                'horas': arrHoras
            };

            return res.json(retorno);

        } catch(e) {
            return res.json({
                'msg': 'Não foi possível buscar os impedimentos.',
                'status': false
            });
        }

    },

}