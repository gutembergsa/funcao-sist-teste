$(document).ready(function () {
    CurrentClienteId_GLOBAL = idCliente
    targetProxy.CurrentClienteId_GLOBAL = idCliente
    IsEditCliente_GLOBAL = true

    if (obj) {
        $('#formCadastro [id]').each(function() {
            $(this).val(obj[this.id]);
        });
    }
    

    AlterarCPFCheckSetup($('#formCadastro #CPF').value, obj.CPF)

    $('#formCadastro').submit(async function (e) {
        e.preventDefault();
        
        const { isValid, Message } = await AlterarCPFCheck(BeneficiariosList_GLOBAL, BeneficiariosToEditList_GLOBAL)

        if (!isValid) {
            ModalDialog("Ocorreu um erro", Message);
            return 
        }

        const formData = {
            "Nome": $(this).find("#Nome").val(),
            "CEP": $(this).find("#CEP").val(),
            "Email": $(this).find("#Email").val(),
            "Sobrenome": $(this).find("#Sobrenome").val(),
            "Nacionalidade": $(this).find("#Nacionalidade").val(),
            "Estado": $(this).find("#Estado").val(),
            "Cidade": $(this).find("#Cidade").val(),
            "Logradouro": $(this).find("#Logradouro").val(),
            "Telefone": $(this).find("#Telefone").val(),
            "CPF": $(this).find("#CPF").val(),
            "Id": idCliente
        }

        const { 
            Success = undefined, 
            Message: r = undefined 
        } = await ClienteAlterar(formData)

        if (!Success) return 

        const BeneficiariosToIncludeListFiltered = BeneficiariosList_GLOBAL.filter((value => value.IDCLIENTE === undefined))
        const BeneficiariosToEditsListFiltered = BeneficiariosList_GLOBAL.filter(({ Id }) =>{
            return (
                BeneficiariosToEditList_GLOBAL.find(id => id === Id) !== undefined && 
                BeneficiariosToIncludeListFiltered.find(value => value.Id === Id) === undefined
            )
        })

        if (BeneficiariosToEditsListFiltered.length) {
            const { Message: rAlterarBeneficiario, Success } = await BeneficiarioAlterar(BeneficiariosToEditsListFiltered, idCliente)
            if (rAlterarBeneficiario?.length && Success) {
                BeneficiariosToEditList_GLOBAL = []
                ModalDialog("Sucesso!", `${r}<br/>${rAlterarBeneficiario}`, backToPreviosPageModalCallback)    
            }
            else {
                ModalDialog("Ocorreu um erro", rAlterarBeneficiario, backToPreviosPageModalCallback);                        
            }
       }
        if (BeneficiariosToIncludeListFiltered.length) {
            const { Message: rIncluirBeneficiario, Success } = await BeneficiarioIncluir(BeneficiariosToIncludeListFiltered, idCliente)
            if (rIncluirBeneficiario?.length && Success) {
                ModalDialog("Sucesso!", `${r}<br/>${rIncluirBeneficiario}`, backToPreviosPageModalCallback)    
            }
            else {
                ModalDialog("Ocorreu um erro", rIncluirBeneficiario, backToPreviosPageModalCallback);
            }
        }
        if (BeneficiariosToExcludeList_GLOBAL.length) {
            const { Message: rExcluirBeneficiario, Success } = await BeneficiarioExcluir(BeneficiariosToExcludeList_GLOBAL)
            if (rExcluirBeneficiario?.length && Success) {
                BeneficiariosToExcludeList_GLOBAL = []
                targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL ;
                ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}`, backToPreviosPageModalCallback);
            }
            else {
                ModalDialog("Ocorreu um erro", rExcluirBeneficiario);
            }
        }
        if (!BeneficiariosToExcludeList_GLOBAL.length && !BeneficiariosToEditsListFiltered.length && !BeneficiariosToIncludeListFiltered.length){
            BeneficiariosToEditList_GLOBAL = []
            ModalDialog("Sucesso!", r, backToPreviosPageModalCallback);
        }
    })
})