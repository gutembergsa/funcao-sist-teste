
async function SetList() {
    const data = JSON.stringify({
        data: JSON.stringify(BeneficiariosList_GLOBAL)
    })

    BeneficiarioSetList(data).then(() => $('#gridBeneficiarios').jtable('load'))
}

async function GetList() {
    const Records = await BeneficiarioGetList(CurrentClienteId_GLOBAL)
    BeneficiariosList_GLOBAL = Records
    SetList()
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