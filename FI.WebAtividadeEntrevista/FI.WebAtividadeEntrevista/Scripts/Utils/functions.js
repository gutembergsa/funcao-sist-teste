//CPF VALIDATION
var CPFList = []
let newClienteCPFLocal 
let oldClienteCPFLocal

function AlterarCPFCheckSetup(newClienteCPF, oldClienteCPF) {
    newClienteCPFLocal = newClienteCPF
    oldClienteCPFLocal = oldClienteCPF

    $('#formCadastro #CPF').on("change", function(e) {
        newClienteCPFLocal = e.target.value
    });
    $('#formCadastro :input').on('change input', function() {
        if (!newClienteCPFLocal || newClienteCPFLocal === oldClienteCPFLocal) {
            return
        }
        if (CPFList.length) {
            CPFList
                .filter(({ Type }) => Type !== "cliente")
                .push({ 
                    Type: "cliente",
                    CPF: newClienteCPFLocal,
                })
        }
        else {
            CPFList
            .push({ 
                Type: "cliente",
                CPF: newClienteCPFLocal,
            })
        }
        console.log("cliente",{ CPFList, newClienteCPFLocal, oldClienteCPFLocal });
    });
    // $('#formCadastro #CPF').on("change", function(e) {
    //     newClienteAlterarCPF = e.target.value
    // });
    
    // $('#formCadastro :input').on('change input', function() {
    //     if (!newClienteCPF || newClienteCPF === oldClienteCPF) {
    //         return
    //     }

    //     if (CPFList.length) {
    //         CPFList
    //             .filter(({ Type }) => Type !== "cliente")
    //             .push({ 
    //                 Type: "cliente",
    //                 CPF: newClienteCPF,
    //             })
    //         return
    //     }

    //     CPFList
    //         .push({ 
    //             Type: "cliente",
    //             CPF: newClienteCPF,
    //         })
            
    //     console.log("AlterarCPFCheckSetup",{ CPFList, newClienteCPF, oldClienteCPF });
    // });
}

async function AlterarCPFCheck(BeneficiariosList, BeneficiariosToEditList) {
    CPFList = [
        ...CPFList, 
        ...BeneficiariosList
            .filter(({ Id, IDCLIENTE = undefined }) => {
                return BeneficiariosToEditList.find(id => id === Id) !== undefined || IDCLIENTE === undefined
            })
            .map(({ CPF, IDCLIENTE = undefined }) => {
                return { 
                    Type: "beneficiario",
                    CPF,
                    IDCLIENTE
                }
            })
    ]

    const data = await fetchPostData("/Services/CheckCPFList", JSON.stringify(CPFList))
    return data
    // $.ajax({
    //     url: `/Services/CheckCPFList`,
    //     method: "POST",
    //     contentType: 'application/json',
    //     data: JSON.stringify(CPFList),
    //     success: function(data) { 
    //         console.log({data});
    //      },
    //     error: function(xhr) {
    //         console.error({xhr});
    //     }
    // });
}

async function IncluirCPFCheck(BeneficiariosList, newClienteCPF) {
    // CPFList = [
    //     ...CPFList, 
    //     ...BeneficiariosList
    //         .filter(({ Id, IDCLIENTE = undefined }) => {
    //             return BeneficiariosToEditList.find(id => id === Id) !== undefined || IDCLIENTE === undefined
    //         })
    //         .map(({ CPF, IDCLIENTE = undefined }) => {
    //             return { 
    //                 Type: "beneficiario",
    //                 CPF,
    //                 IDCLIENTE
    //             }
    //         })
    // ]
    CPFList = BeneficiariosList.map(({CPF, IDCLIENTE = undefined}) => {
        return { 
             Type: "beneficiario",
             CPF,
             IDCLIENTE
         }
     })
     CPFList.push({ 
         Type: "cliente",
         CPF: newClienteCPF,
     })

    const data = await fetchPostData("/Services/CheckCPFList", JSON.stringify(CPFList))

    console.log("IncluirCPFCheck", { CPFList, data });

    return data
    // $.ajax({
    //     url: `/Services/CheckCPFList`,
    //     method: "POST",
    //     contentType: 'application/json',
    //     data: JSON.stringify(CPFList),
    //     success: function(data) { 
    //         console.log({data});
    //      },
    //     error: function(xhr) {
    //         console.error({xhr});
    //     }
    // });

}

//BENEFICIARIO LOCAL CRUD
function incluir() {
    const nome =  document.getElementById("Nome-beneficiario")
    const CPF =  document.getElementById("CPF-beneficiario")
    if (!nome.value || !CPF.value) {
        return 
    }

    const Id = Date.now()
    const modelData = {
        "Id": Id,
        "Nome": nome.value,
        "CPF": CPF.value,
    }

    const cpfAlreadyExist = BeneficiariosList_GLOBAL.some(({CPF}) => CPF === modelData.CPF)

    if (!cpfAlreadyExist) {
        BeneficiariosList_GLOBAL.push(modelData)
        // HasChangedBeneficiariosList_GLOBAL = true
        targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL

        console.log({modelData, BeneficiariosList_GLOBAL});


        $("#formCadastroBeneficiario")[0].reset();   
    }
}

function excluirSetup(id) {
    if (!isNaN(id)) {

        BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL.filter(value =>  value.Id !== id)
        // HasChangedBeneficiariosList_GLOBAL = true

        targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL
        BeneficiariosToExcludeList_GLOBAL.push(id)
    }
}

function alterarSetup(idBeneficiario, cpfBeneficiario, nomeBeneficiario){
    const Nome =  document.getElementById("Nome-beneficiario")
    const CPF =  document.getElementById("CPF-beneficiario")
    const button =  document.getElementById("submit")

    button.innerText = "Alterar"

    Nome.value = nomeBeneficiario
    CPF.value = cpfBeneficiario

    IsEditBeneficiario_GLOBAL = true

    Beneficiario_GLOBAL = { id: idBeneficiario, cpf: cpfBeneficiario, nome: nomeBeneficiario }
}

function alterar(idBeneficiario){
    const Nome =  document.getElementById("Nome-beneficiario")
    const CPF =  document.getElementById("CPF-beneficiario")
    const form =  document.getElementById("formCadastroBeneficiario")
    const button =  document.getElementById("submit")


    BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL.map((value) =>  {
        if (value.Id === idBeneficiario) {
            return {
                ...value,
                Nome: Nome.value,
                CPF: CPF.value
            }
        }
        return value
    })
    
    BeneficiariosToEditList_GLOBAL.push(idBeneficiario)

    button.innerText = "Incluir"
    form.reset();   

    targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL
}

//MODAL
function backToPreviosPageModalCallback(){  
    window.history.back();
}

function ModalDialog(titulo, texto, closeCallback = undefined) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');

    $(`#${random}`).on("hidden.bs.modal", function () {
        closeCallback?.()
    })
}

function ModalBeneficiario(closeCallback = undefined) {
    var texto = `
        <div id="beneficiarioModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">Beneficiarios</h4>
                    </div>
                    <div class="modal-body">
                        <form 
                            id="formCadastroBeneficiario" 
                            method="post" 
                        >
                            <div class="row" style="position: relative;">
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <label for="CPF">CPF:</label>
                                        <input required type="text" class="form-control" id="CPF-beneficiario" name="CPF" placeholder="Ex.: 123.453.789-00"
                                            data-mask="999.999.999-99" minlength="14"/>
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <label for="Nome">Nome:</label>
                                        <input required type="text" class="form-control" id="Nome-beneficiario" name="Nome" placeholder="Ex.: João"
                                            maxlength="50"/>
                                    </div>
                                </div>
                                <div class="col-sm-2 mt-auto text-center" style="position: absolute;right: 0;bottom: 0;">
                                    <div class="form-group">
                                        <button type="button" id="submit" class="btn btn-sm btn-success">Incluir</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="scroll-content">
                            <table id="gridBeneficiarios" class="table beneficiario"></table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div> <!-- /.modal -->
    `
    $('body').append(texto);
    $('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>');

    $('#submit').on("click", () => {
        if (IsEditBeneficiario_GLOBAL) {
            IsEditBeneficiario_GLOBAL = false
            return alterar(Beneficiario_GLOBAL.id)
        }
        incluir();
    });

    $('#beneficiarioModal').modal('show');
    $('#beneficiarioModal').on("hidden.bs.modal", function () {
        closeCallback?.()
    })
}

