
async function SetList() {
    const data = JSON.stringify({
        data: JSON.stringify(BeneficiariosList_GLOBAL)
    })

    BeneficiarioSetList(data).then(() => $('#gridBeneficiarios').jtable('load'))
    // $.ajax({
    //     url: '/Beneficiario/SetListData',
    //     method: "POST",
    //     data: {
    //         data: JSON.stringify(BeneficiariosList)
    //     },
    //     success: function(data) { 
    //         $('#gridBeneficiarios').jtable('load')
    //     },
    //     error: function(xhr, status, error) {
    //         console.error({xhr, status, error});
    //     }
    // });
}

async function GetList() {
    const Records = await BeneficiarioGetList(CurrentClienteId_GLOBAL)
    BeneficiariosList_GLOBAL = Records
    SetList()
    // $.ajax({
    //     url: '/Beneficiario/List',
    //     method: "POST",
    //     contentType: 'application/json',
    //     data: JSON.stringify({
    //         jtPageSize: 1000,
    //         jtSorting: 'Nome ASC',
    //         IDCLIENTE: CurrentClienteId
    //     }),
    //     success: function(data) { 
    //         BeneficiariosList_GLOBAL = data.Records
    //         SetList()
    //      },
    //     error: function(xhr, status, error) {
    //         console.error(xhr.responseText);
    //     }
    // });
}

var targetProxy = new Proxy({}, {
    set: function (_, key, _) {
        switch (key) {
            case "CurrentClienteId_GLOBAL":
                GetList();
                break;
            case "BeneficiariosList_GLOBAL":
                SetList();
                break;
            default:
                break;
        }
    }
});