$(document).ready(function () {   
    $('#beneficiarioButton').on("click", function () {
        $("#beneficiarioModal").on("shown.bs.modal", function () {
            const table = document.getElementById("gridBeneficiarios")
            if (table){
                $('#gridBeneficiarios').jtable({
                    paging: false,
                    defaultSorting: 'Nome ASC',
                    pageSize: 5,
                    sorting: true,
                    actions: {
                        listAction: "/Beneficiario/GetListData",
                    },
                    fields: {
                        CPF: {
                            title: 'CPF',
                            width: '30%'
                        },
                        Nome: {
                            title: 'Nome',
                            width: '30%'
                        },
                        Alterar: {
                            width: '15%',
                            title: '',
                            display: function (data) {
                                return `<button id="alterarBeneficiario" data-id="${data.record.Id}" class="btn btn-primary btn-sm" onclick="alterarSetup(${data.record.Id}, '${data.record.CPF}', '${data.record.Nome}');">Alterar</button>`;
                            }
                        },
                        Excluir: {
                            width: '30%',
                            title: '',
                            display: function (data) {
                                return `<button id="excluirBeneficiario" class="btn btn-primary btn-sm" onclick="excluirSetup(${data.record.Id}, '${data.record.CPF}');">Excluir</button>`;
                            }
                        }
                    },
                });
            }
            if (document.getElementById("gridBeneficiarios")) {
                $('#gridBeneficiarios').jtable('load');
            }
        })
        $("#beneficiarioModal").on("hidden.bs.modal", function () {
            IsEditBeneficiario_GLOBAL = false
            $("#formCadastroBeneficiario")[0].reset();
        })

        ModalBeneficiario()
    })    
})
