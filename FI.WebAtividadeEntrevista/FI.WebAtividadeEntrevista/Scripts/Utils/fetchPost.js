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
        JSON.stringify(BeneficiariosToIncludeListFiltered)
    );
    return data
}

async function BeneficiarioAlterar(BeneficiariosToEditsListFiltered, IdCliente) {
    const data = await fetchPostData(
        `/Beneficiario/Alterar?Id=${IdCliente}`, 
        JSON.stringify(BeneficiariosToEditsListFiltered),
    )
    return data
}

async function BeneficiarioExcluir(IdBeneficiarioList) {
    const data = await fetchPostData(
        "/Beneficiario/Excluir", 
        JSON.stringify(IdBeneficiarioList),
    )
    return data
}

//CLIENTE
async function ClienteIncluir(formData) {
    return await fetchPostData("/Cliente/Incluir", JSON.stringify(formData));
    // $.ajax({
    //     url: urlPost,
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
    //         "CPF": newClienteCPF
    //     },
    //     error:
    //     function (r) {                
    //         if (r.status == 400)
    //             ModalDialog("Ocorreu um erro", r.responseJSON);
    //         else if (r.status == 500)
    //             ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
    //     },
    //     success:

    // });
}

async function ClienteAlterar(formData) {
    return await fetchPostData("/Cliente/Alterar", JSON.stringify(formData));;
}