
$(document).ready(function () {
    IsEditCliente_GLOBAL = false

    $('#formCadastro').submit(async function (e) {
        e.preventDefault();
        
        const newClienteCPF = $(this).find("#CPF").val()

        const { isValid, Message } = await IncluirCPFCheck(BeneficiariosList_GLOBAL , newClienteCPF)

        if (!isValid) {
            ModalDialog("Ocorreu um erro", Message);
            return 
        }
        // const newClienteCPF = $(this).find("#CPF").val()
        // const CPFList = BeneficiariosList_GLOBAL .map(({CPF, IDCLIENTE = undefined}) => {
        //    return { 
        //         Type: "beneficiario",
        //         CPF,
        //         IDCLIENTE
        //     }
        // })
        // CPFList.push({ 
        //     Type: "cliente",
        //     CPF: newClienteCPF,
        // })

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": newClienteCPF
            },
            error:
            function (r) {                
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            async function ({r, Id}) {
                console.log("Incluir", {BeneficiariosToEditList_GLOBAL, BeneficiariosToExcludeList_GLOBAL});
                if (BeneficiariosList_GLOBAL .length) {
                    const rIncluirBeneficiario = await BeneficiarioIncluir(BeneficiariosList_GLOBAL , id)
                    if (rIncluirBeneficiario?.length) {
                        ModalDialog("Sucesso!", `${r}<br/>${rIncluirBeneficiario}` )    
                    }
                    else {
                        ModalDialog("Ocorreu um erro", rIncluirBeneficiario);
                    }
                    // $.ajax({
                    //     url: `/Beneficiario/Incluir?Id=${Id}`,
                    //     method: "POST",
                    //     contentType: 'application/json',
                    //     data: JSON.stringify(BeneficiariosList_GLOBAL ),
                    //     success: function() { 
                    //         ModalDialog("Sucesso!", r)
                    //         $("#formCadastro")[0].reset();
                    //      },
                    //     error: function(xhr) {
                    //         ModalDialog("Ocorreu um erro", xhr.responseJSON);
                    //         if (r.status == 400){
                    //             $("#formCadastro")[0].reset();
                    //         }
                    //     }
                    // });
                }
                if (BeneficiariosToExcludeList_GLOBAL.length) {
                    console.log("Remove from database");
                    for (const { id } in BeneficiariosToExcludeList_GLOBAL) {
                        const rExcluirBeneficiario = await BeneficiarioExcluir(id)
                        if (rExcluirBeneficiario?.length) {
                            targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL ;
                            ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}` );
                        }
                        else {
                            ModalDialog("Ocorreu um erro", rExcluirBeneficiario);
                        }
                        // await $.ajax({
                        //     url: "/Beneficiario/Excluir",
                        //     method: "POST",
                        //     data: {
                        //         Id: id
                        //     },
                        //     success: function(data) { 
                        //         console.log({data});
                        //         BeneficiariosToExcludeList = []
                        //         targetProxy.BeneficiariosList_GLOBAL _GLOBAL = BeneficiariosList_GLOBAL 
                        //     },
                        //     error: function(xhr, status, error) {
                        //         console.error(xhr.responseText, {xhr, status, error});
                        //     }
                        // });
                    }
                }
                if (!BeneficiariosToExcludeList_GLOBAL.length && !BeneficiariosList_GLOBAL .length){
                    BeneficiariosToEditList_GLOBAL = []
                    ModalDialog("Sucesso!", r);
                    $("#formCadastro")[0].reset();
                }
            }
        });
    })    
})

function ModalDialog(titulo, texto) {
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
}
