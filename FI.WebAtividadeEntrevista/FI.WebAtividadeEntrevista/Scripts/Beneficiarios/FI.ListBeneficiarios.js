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
            //Load beneficiarios list from server
            if (document.getElementById("gridBeneficiarios")) {
                $('#gridBeneficiarios').jtable('load');
            }
        })
        $("#beneficiarioModal").on("hidden.bs.modal", function () {
            IsEditBeneficiario_GLOBAL = false
            $("#formCadastroBeneficiario")[0].reset();
        })
        // if (!IsEditCliente_GLOBAL) {
        //     CurrentClienteId_GLOBAL = null
        //     BeneficiariosList_GLOBAL = []
        //     SetList();
        // }
        ModalBeneficiario()
    })    
})

// function incluir() {
//     const nome =  document.getElementById("Nome-beneficiario")
//     const CPF =  document.getElementById("CPF-beneficiario")
//     if (!nome.value || !CPF.value) {
//         return 
//     }

//     const Id = Date.now()
//     const modelData = {
//         "Id": Id,
//         "Nome": nome.value,
//         "CPF": CPF.value,
//     }

//     const cpfAlreadyExist = BeneficiariosList.some(({CPF}) => CPF === modelData.CPF)

//     if (!cpfAlreadyExist) {
//         BeneficiariosList.push(modelData)
//         HasChangedBeneficiariosList_GLOBAL = true
//         targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList

//         console.log({modelData, BeneficiariosList});


//         $("#formCadastroBeneficiario")[0].reset();   
//     }
// }

// function excluirSetup(id) {
//     if (!isNaN(id)) {

//         BeneficiariosList_GLOBAL = BeneficiariosList.filter(value =>  value.Id !== id)
//         HasChangedBeneficiariosList_GLOBAL = true

//         targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList
//         BeneficiariosToExcludeList.push(id)
//     }
// }

// function alterarSetup(id, cpf, nome){
//     const Nome =  document.getElementById("Nome-beneficiario")
//     const CPF =  document.getElementById("CPF-beneficiario")
//     const button =  document.getElementById("submit")

//     button.innerText = "Alterar"

//     Nome.value = nome
//     CPF.value = cpf

//     IsEdit = true

//     Beneficiario_GLOBAL = { id, cpf, nome }
// }

// function alterar({id}){
//     const Nome =  document.getElementById("Nome-beneficiario")
//     const CPF =  document.getElementById("CPF-beneficiario")
//     const form =  document.getElementById("formCadastroBeneficiario")
//     const button =  document.getElementById("submit")

//     BeneficiariosList_GLOBAL = BeneficiariosList.map((value) =>  {
//         if (value.Id === id) {
//             return {
//                 ...value,
//                 Nome: Nome.value,
//                 CPF: CPF.value
//             }
//         }
//         return value
//     })
    
//     BeneficiariosToEditList.push(id)

//     console.log({BeneficiariosList});

//     button.innerText = "Incluir"
//     form.reset();   

//     targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList
// }