function fetchPostData(url, body, sucessCallback = undefined, errorCallback = undefined) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body
        }).then(response => {
            const data = response.json();
            sucessCallback?.(data);
            resolve(data);
        })
        .catch(error => {
            errorCallback?.(error);
            reject(error);
        });
    });
};

//BENEFICIARIO
async function BeneficiarioSetList(BeneficiariosList) {
    const body = BeneficiariosList
    console.log("BeneficiarioSetList", {body});
    
    await fetchPostData(
        '/Beneficiario/SetListData', 
        body,
    );
};
async function BeneficiarioGetList(IdCliente) {
    const { Records } = await fetchPostData(
        '/Beneficiario/List', 
        JSON.stringify({
            jtPageSize: 1000,
            jtSorting: 'Nome ASC',
            IDCLIENTE: IdCliente
        })
    );
    return Records
};
async function BeneficiarioIncluir(BeneficiariosToIncludeListFiltered, IdCliente) {
    const data = await fetchPostData(
        `/Beneficiario/Incluir?Id=${IdCliente}`, 
        JSON.stringify(BeneficiariosToIncludeListFiltered),
        // (rIncluirBeneficiario) => { 
        //     ModalDialog("Sucesso!", rIncluirBeneficiario)
        //  },
        // (xhr) => {
        //     ModalDialog("Ocorreu um erro", xhr.responseJSON);
        //     if (r.status == 400){
        //         $("#formCadastro")[0].reset();
        //     }
        // }
    );
    return data
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
async function BeneficiarioAlterar(BeneficiariosToEditsListFiltered, IdCliente) {
    const data = await fetchPostData(
        `/Beneficiario/Alterar?Id=${IdCliente}`, 
        JSON.stringify(BeneficiariosToEditsListFiltered),
    )
    return data
    // $.ajax({
    //     url: `/Beneficiario/Alterar?Id=${id}`,
    //     method: "POST",
    //     contentType: 'application/json',
    //     data: JSON.stringify(BeneficiariosToEditsListFiltered),
    //     success: function(rAlterarBeneficiario) { 
    //         BeneficiariosToEditList = []
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
async function BeneficiarioExcluir(IdBeneficiario) {
    const data = await fetchPostData(
        "/Beneficiario/Excluir", 
        JSON.stringify({ 
            Id: IdBeneficiario 
        }),
    )
    return data
    // $.ajax({
    //     url: "/Beneficiario/Excluir",
    //     method: "POST",
    //     data: {
    //         Id: id
    //     },
    //     success: function(rExcluirBeneficiario) { 
    //         ModalDialog("Sucesso!", `${r}<br/>${rExcluirBeneficiario}` )
    //         targetProxy.BeneficiariosList_GLOBAL = BeneficiariosList
    //     },
    //     error: function(xhr, status, error) {
    //         console.error(xhr.responseText, {xhr, status, error});
    //     }
    // });
}

//CLIENTE
