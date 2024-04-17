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
        
        const { isValid, Message } = await AlterarCPFCheck(BeneficiariosList_GLOBAL, BeneficiariosToEditList_GLOBAL, obj.CPF)

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
            Message: response = undefined 
        } = await ClienteAlterar(formData)

        if (!Success) return 

        let message = response
        let hasError = false
        const BeneficiariosToIncludeListFiltered = BeneficiariosList_GLOBAL.filter((value => value.IDCLIENTE === undefined))
        const BeneficiariosToEditsListFiltered = BeneficiariosList_GLOBAL.filter(({ Id }) =>{
            return (
                BeneficiariosToEditList_GLOBAL.find(id => id === Id) !== undefined && 
                BeneficiariosToIncludeListFiltered.find(value => value.Id === Id) === undefined
            )
        })

        if (BeneficiariosToEditsListFiltered.length) {
            const { Message: rAlterarBeneficiario, Success } = await BeneficiarioAlterar(BeneficiariosToEditsListFiltered, idCliente)
            if (Success) {
                BeneficiariosToEditList_GLOBAL = []
                message = message + `<br/>${rAlterarBeneficiario}`
            }
            else {
                ModalDialog("Ocorreu um erro", rAlterarBeneficiario, backToPreviosPageModalCallback);  
                hasError = true                      
            }
       }
        if (BeneficiariosToIncludeListFiltered.length) {
            const { Message: rIncluirBeneficiario, Success } = await BeneficiarioIncluir(BeneficiariosToIncludeListFiltered, idCliente)
            if (Success) {
                message = message + `<br/>${rIncluirBeneficiario}`
            }
            else {
                ModalDialog("Ocorreu um erro", rIncluirBeneficiario, backToPreviosPageModalCallback);
                hasError = true                      
            }
        }
        if (BeneficiariosToExcludeList_GLOBAL.length) {
            const { Message: rExcluirBeneficiario, Success } = await BeneficiarioExcluir(BeneficiariosToExcludeList_GLOBAL)
            if (rExcluirBeneficiario?.length && Success) {
                message = message + `<br/>${rExcluirBeneficiario}`
                BeneficiariosToExcludeList_GLOBAL = []
                targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL ;
            }
            else {
                ModalDialog("Ocorreu um erro", rExcluirBeneficiario);
                hasError = true                      
            }
        }
        if (!BeneficiariosToExcludeList_GLOBAL.length && !BeneficiariosToEditsListFiltered.length && !BeneficiariosToIncludeListFiltered.length){
            BeneficiariosToEditList_GLOBAL = []
        }
        if (!hasError) {
            ModalDialog("Sucesso!", message, backToPreviosPageModalCallback);
        }
    })
})