const modalCallback = () => window.history.back();

$(document).ready(function () {
    CurrentClienteId_GLOBAL = idCliente
    targetProxy.CurrentClienteId_GLOBAL = idCliente
    IsEditCliente_GLOBAL = true

    //Vericando validade dos CPFS
    if (obj) {
        console.log({ obj });
        $('#formCadastro [id]').each(function() {
            $(this).val(obj[this.id]);
        });
        // $('#formCadastro #Nome').val(obj.Nome);
        // $('#formCadastro #CEP').val(obj.CEP);
        // $('#formCadastro #Email').val(obj.Email);
        // $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        // $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        // $('#formCadastro #Estado').val(obj.Estado);
        // $('#formCadastro #Cidade').val(obj.Cidade);
        // $('#formCadastro #Logradouro').val(obj.Logradouro);
        // $('#formCadastro #Telefone').val(obj.Telefone);
        // $('#formCadastro #CPF').val(obj.CPF);
    }
    

    AlterarCPFCheckSetup($('#formCadastro #CPF').value, obj.CPF)
    // let CPFList = []
    // let newClienteCPF = $('#formCadastro #CPF').value
    // let oldClienteCPF = obj.CPF

    // $('#formCadastro #CPF').on("change", function(e) {
    //     newClienteCPF = e.target.value
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
    //     }
    //     else {
    //         CPFList
    //         .push({ 
    //             Type: "cliente",
    //             CPF: newClienteCPF,
    //         })
    //     }
    //     console.log("cliente",{ CPFList, newClienteCPF, oldClienteCPF });
    // });

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

        console.log({obj});

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
                ModalDialog("Sucesso!", `${r}<br/>${rAlterarBeneficiario}`, modalCallback)    
            }
            else {
                ModalDialog("Ocorreu um erro", rAlterarBeneficiario, modalCallback);                        
            }
            // $.ajax({
            //     url: `/Beneficiario/Alterar?Id=${id}`,
            //     method: "POST",
            //     contentType: 'application/json',
            //     data: JSON.stringify(BeneficiariosToEditsListFiltered),
            //     success: function(rAlterarBeneficiario) { 
            //         BeneficiariosToEditList_GLOBAL = []
            //         ModalDialog("Sucesso!", `${r}<br/>${rAlterarBeneficiario}` )
            //      },
            //     error: function(xhr, status, error) {
            //         console.error(xhr.responseText, {xhr,status, error});
            //         ModalDialog("Ocorreu um erro", xhr.responseJSON);
            //         if (status == 400){
            //             $("#formCadastro")[0].reset();
            //         }
            //     }
            // });
        }
        if (BeneficiariosToIncludeListFiltered.length) {
            const { Message: rIncluirBeneficiario, Success } = await BeneficiarioIncluir(BeneficiariosToIncludeListFiltered, idCliente)
            if (rIncluirBeneficiario?.length && Success) {
                ModalDialog("Sucesso!", `${r}<br/>${rIncluirBeneficiario}`, modalCallback)    
            }
            else {
                ModalDialog("Ocorreu um erro", rIncluirBeneficiario, modalCallback);
            }
            // $.ajax({
            //     url: `/Beneficiario/Incluir?Id=${id}`,
            //     method: "POST",
            //     contentType: 'application/json',
            //     data: JSON.stringify(BeneficiariosToIncludeListFiltered),
            //     success: function(rIncluirBeneficiario) { 
            //         console.log(rIncluirBeneficiario);
            //         ModalDialog("Sucesso!", `${r}<br/>${rIncluirBeneficiario}` )
            //      },
            //     error: function(xhr, status, error) {
            //         console.error(xhr.responseText, {xhr,status, error});

            //         ModalDialog("Ocorreu um erro", xhr.responseJSON);

            //         if (r.status == 400){
            //             $("#formCadastro")[0].reset();
            //         }
            //     }
            // });
        }
        if (BeneficiariosToExcludeList_GLOBAL.length) {
            const { Message: rExcluirBeneficiario, Success } = await BeneficiarioExcluir(BeneficiariosToExcludeList_GLOBAL)
            if (rExcluirBeneficiario?.length && Success) {
                BeneficiariosToExcludeList_GLOBAL = []
                targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL ;
                ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}`, modalCallback);
            }
            else {
                ModalDialog("Ocorreu um erro", rExcluirBeneficiario);
            }
            // for (const id of BeneficiariosToExcludeList_GLOBAL) {
            //     const rExcluirBeneficiario = await BeneficiarioExcluir(id)
            //     if (rExcluirBeneficiario?.length) {
            //         targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL ;
            //         ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}` );
            //     }
            //     else {
            //         ModalDialog("Ocorreu um erro", rExcluirBeneficiario);
            //     }
            //     // $.ajax({
            //     //     url: "/Beneficiario/Excluir",
            //     //     method: "POST",
            //     //     data: {
            //     //         Id: id
            //     //     },
            //     //     success: function(rExcluirBeneficiario) { 
            //     //         ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}` )
            //     //         targetProxy.BeneficiariosList_GLOBAL _GLOBAL = BeneficiariosList_GLOBAL 
            //     //     },
            //     //     error: function(xhr, status, error) {
            //     //         console.error(xhr.responseText, {xhr, status, error});
            //     //     }
            //     // });
            // }
        }
        if (!BeneficiariosToExcludeList_GLOBAL.length && !BeneficiariosToEditsListFiltered.length && !BeneficiariosToIncludeListFiltered.length){
            BeneficiariosToEditList_GLOBAL = []
            ModalDialog("Sucesso!", r, modalCallback);
        }

        console.log("Alterar", { BeneficiariosList_GLOBAL , BeneficiariosToIncludeListFiltered, BeneficiariosToEditList_GLOBAL, BeneficiariosToEditsListFiltered, BeneficiariosToExcludeList_GLOBAL});
        // if (CPFList.length) {
        //     const { isValid, Message } = await AlterarCPFCheck(CPFList, BeneficiariosList_GLOBAL , BeneficiariosToEditList_GLOBAL)

        //     console.log({isValid, Message});
    
        //     if (!isValid) {
        //         ModalDialog("Ocorreu um erro", Message);
        //         return 
        //     }
        // }
        // // CPFList = [
        // //     ...CPFList, 
        // //     ...BeneficiariosList_GLOBAL 
        // //         .filter(({ Id, IDCLIENTE = undefined }) => {
        // //             return BeneficiariosToEditList.find(id => id === Id) !== undefined || IDCLIENTE === undefined
        // //         })
        // //         .map(({CPF, IDCLIENTE = undefined}) => {
        // //             return { 
        // //                 Type: "beneficiario",
        // //                 CPF,
        // //                 IDCLIENTE
        // //             }
        // //         })
        // // ]

        // // console.log({ CPFList });
        // // if (CPFList.length) {
        // //     $.ajax({
        // //         url: `/Services/CheckCPFList`,
        // //         method: "POST",
        // //         contentType: 'application/json',
        // //         data: JSON.stringify(CPFList),
        // //         success: function(data) { 
        // //             console.log({data});
        // //          },
        // //         error: function(xhr) {
        // //             console.error({xhr});
        // //         }
        // //     });
        // // }

        // //Salvando dados
        
        // $.ajax({
        //     url: urlPost + `?currentCPF=${obj.CPF}`,
        //     method: "POST",
        //     data: {
        //         "NOME": $(this).find("#Nome").val(),
        //         "CEP": $(this).find("#CEP").val(),
        //         "Email": $(this).find("#Email").val(),
        //         "Sobrenome": $(this).find("#Sobrenome").val(),
        //         "Nacionalidade": $(this).find("#Nacionalidade").val(),
        //         "Estado": $(this).find("#Estado").val(),
        //         "Cidade": $(this).find("#Cidade").val(),
        //         "Logradouro": $(this).find("#Logradouro").val(),
        //         "Telefone": $(this).find("#Telefone").val(),
        //         "CPF": $(this).find("#CPF").val(),
        //     },
        //     error: function (r) {
        //         if (r.status == 400)
        //             ModalDialog("Ocorreu um erro", r.responseJSON);
        //         else if (r.status == 500)
        //             ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
        //     },
        //     success: async function (r) {
        //         const BeneficiariosToIncludeListFiltered = BeneficiariosList_GLOBAL .filter((value => value.IDCLIENTE === undefined))
        //         const BeneficiariosToEditsListFiltered = BeneficiariosList_GLOBAL .filter(({ Id }) =>{
        //             return (
        //                 BeneficiariosToEditList_GLOBAL.find(id => id === Id) !== undefined && 
        //                 BeneficiariosToIncludeListFiltered.find(value => value.Id === Id) === undefined
        //             )
        //         })

        //         if (BeneficiariosToEditsListFiltered.length) {
        //             const rAlterarBeneficiario = await BeneficiarioAlterar(BeneficiariosToEditsListFiltered, id)
        //             if (rAlterarBeneficiario?.length) {
        //                 BeneficiariosToEditList_GLOBAL = []
        //                 ModalDialog("Sucesso!", `${r}<br/>${rAlterarBeneficiario}` )    
        //             }
        //             else {
        //                 ModalDialog("Ocorreu um erro", rAlterarBeneficiario);                        
        //             }
        //             // $.ajax({
        //             //     url: `/Beneficiario/Alterar?Id=${id}`,
        //             //     method: "POST",
        //             //     contentType: 'application/json',
        //             //     data: JSON.stringify(BeneficiariosToEditsListFiltered),
        //             //     success: function(rAlterarBeneficiario) { 
        //             //         BeneficiariosToEditList_GLOBAL = []
        //             //         ModalDialog("Sucesso!", `${r}<br/>${rAlterarBeneficiario}` )
        //             //      },
        //             //     error: function(xhr, status, error) {
        //             //         console.error(xhr.responseText, {xhr,status, error});
        //             //         ModalDialog("Ocorreu um erro", xhr.responseJSON);
        //             //         if (status == 400){
        //             //             $("#formCadastro")[0].reset();
        //             //         }
        //             //     }
        //             // });
        //         }
        //         if (BeneficiariosToIncludeListFiltered.length) {
        //             const rIncluirBeneficiario = await BeneficiarioIncluir(BeneficiariosToIncludeListFiltered, id)
        //             if (rIncluirBeneficiario?.length) {
        //                 ModalDialog("Sucesso!", `${r}<br/>${rIncluirBeneficiario}` )    
        //             }
        //             else {
        //                 ModalDialog("Ocorreu um erro", rIncluirBeneficiario);
        //             }
        //             // $.ajax({
        //             //     url: `/Beneficiario/Incluir?Id=${id}`,
        //             //     method: "POST",
        //             //     contentType: 'application/json',
        //             //     data: JSON.stringify(BeneficiariosToIncludeListFiltered),
        //             //     success: function(rIncluirBeneficiario) { 
        //             //         console.log(rIncluirBeneficiario);
        //             //         ModalDialog("Sucesso!", `${r}<br/>${rIncluirBeneficiario}` )
        //             //      },
        //             //     error: function(xhr, status, error) {
        //             //         console.error(xhr.responseText, {xhr,status, error});

        //             //         ModalDialog("Ocorreu um erro", xhr.responseJSON);

        //             //         if (r.status == 400){
        //             //             $("#formCadastro")[0].reset();
        //             //         }
        //             //     }
        //             // });
        //         }
        //         if (BeneficiariosToExcludeList_GLOBAL.length) {
        //             const rExcluirBeneficiario = await BeneficiarioExcluir(BeneficiariosToExcludeList_GLOBAL)
        //             if (rExcluirBeneficiario?.length) {
        //                 BeneficiariosToExcludeList_GLOBAL = []
        //                 targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL ;
        //                 ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}` );
        //             }
        //             else {
        //                 ModalDialog("Ocorreu um erro", rExcluirBeneficiario);
        //             }
        //             // for (const id of BeneficiariosToExcludeList_GLOBAL) {
        //             //     const rExcluirBeneficiario = await BeneficiarioExcluir(id)
        //             //     if (rExcluirBeneficiario?.length) {
        //             //         targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList_GLOBAL ;
        //             //         ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}` );
        //             //     }
        //             //     else {
        //             //         ModalDialog("Ocorreu um erro", rExcluirBeneficiario);
        //             //     }
        //             //     // $.ajax({
        //             //     //     url: "/Beneficiario/Excluir",
        //             //     //     method: "POST",
        //             //     //     data: {
        //             //     //         Id: id
        //             //     //     },
        //             //     //     success: function(rExcluirBeneficiario) { 
        //             //     //         ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}` )
        //             //     //         targetProxy.BeneficiariosList_GLOBAL _GLOBAL = BeneficiariosList_GLOBAL 
        //             //     //     },
        //             //     //     error: function(xhr, status, error) {
        //             //     //         console.error(xhr.responseText, {xhr, status, error});
        //             //     //     }
        //             //     // });
        //             // }
        //         }
        //         if (!BeneficiariosToExcludeList_GLOBAL.length && !BeneficiariosToEditsListFiltered.length && !BeneficiariosToIncludeListFiltered.length){
        //             BeneficiariosToEditList_GLOBAL = []
        //             ModalDialog("Sucesso!", r);
        //         }

        //         console.log("Alterar", { BeneficiariosList_GLOBAL , BeneficiariosToIncludeListFiltered, BeneficiariosToEditList_GLOBAL, BeneficiariosToEditsListFiltered, BeneficiariosToExcludeList_GLOBAL});
        //     }
        // });
    })
})