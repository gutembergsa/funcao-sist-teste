//TODO: Criar id temporario para itens que não foram salvos no db; DONE
//TODO Solucionar (Entender) o problema de altera o  alterar um beneficiario que ainda nao foi salvo; DONE
//TODO Adicionar callback para exclusão dos beneficiarios da lista; DONE
//TODO: Corrigir problemas ao adicionar novos beneficiarios durante a alteração do cliente; DONE
//TODO: Adicionar validação dos CPF Antes de salvar clientes e beneficiarios; DONE
//TODO: Adicionar trava efetiva para os requests em caso alteração sem dados; DONE
//TODO: Adicionar scroll na lista de beneficiarios DONE
//TODO: Corrigir lista de beneficiario esta mantendo dados da ultima lista carreagda; DONE
//TODO: Adicionar as globais que faltam; DONE
//TODO: Adicionar cleanup da lista de beneficiarios quando incluir novo cliente; DONE
//TODO: Alterar exluir para chamar controller apenas uma vez para todos os valores; DONE
//TODO: Corrigi lista de beneficiarios sendo removida toda vez que abre o modal de beneficiarios
// deve limpar apenas na primeira vez que carrega a pagina para limpar dados que possam estar salvos DONE
//TODO: Adicionar metodo fetchPost para Incluir Cliente e Alterar Cliente DONE
//TODO: Organizar o codigo jquery DONE

//TODO: Organizar interface backend - frontend DONE
//TODO Revisar logica para incluir beneficiario com mesmo CPF para em diferentes clientes DONE
//TODO: centralizar mensagens do modal de erro

//TODO: Corrigir valor de cpf que esta sendo inserido na lista de beneficiarios; ONHOLD - LOW PRIO - NEED MORE TEST
//Apos reload da pagina em alguna casos o cpf esta ficando com valores incorretos;
//TODO: Alterar alterar para chamar controller apenas uma vez para todos os valores; LOW PRIO

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