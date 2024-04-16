
$(document).ready(function () {
    IsEditCliente_GLOBAL = false
    CurrentClienteId_GLOBAL = null
    BeneficiariosList_GLOBAL = []
    SetList();

    $('#formCadastro').submit(async function (e) {
        e.preventDefault();
        
        const newClienteCPF = $(this).find("#CPF").val()

        const { isValid, Message } = await IncluirCPFCheck(BeneficiariosList_GLOBAL , newClienteCPF)

        if (!isValid) {
            ModalDialog("Ocorreu um erro", Message, backToPreviosPageModalCallback);
            return 
        }

        const body = {
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
        }

        const data = await ClienteIncluir(body, newClienteCPF)

        const { Id = undefined, Message: response = undefined } = data

        if (!Id) return 

        if (BeneficiariosList_GLOBAL .length) {
            const { Message: rIncluirBeneficiario, Success } = await BeneficiarioIncluir(BeneficiariosList_GLOBAL , Id)
            if (rIncluirBeneficiario?.length && Success) {
                ModalDialog("Sucesso!", `${response}<br/>${rIncluirBeneficiario}`, backToPreviosPageModalCallback)    
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
                ModalDialog("Sucesso!", `${response}<br/>${rExcluirBeneficiario}`, backToPreviosPageModalCallback);
            }
            else {
                ModalDialog("Ocorreu um erro", rExcluirBeneficiario, backToPreviosPageModalCallback);
            }
        }
        if (!BeneficiariosToExcludeList_GLOBAL.length && !BeneficiariosList_GLOBAL .length){
            BeneficiariosToEditList_GLOBAL = []
            ModalDialog("Sucesso!", response, backToPreviosPageModalCallback);
        }
    })    
})