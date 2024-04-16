
// var Beneficiario_GLOBAL = null
// var BeneficiariosList_GLOBAL = []
// var BeneficiariosToEditList_GLOBAL = []
// var HasChangedBeneficiariosList_GLOBAL = false
// var IsEditBeneficiario_GLOBAL = false
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

// function ModalBeneficiario() {
//     var texto = `
//         <div id="beneficiarioModal" class="modal fade">
//             <div class="modal-dialog">
//                 <div class="modal-content">
//                     <div class="modal-header">
//                         <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
//                         <h4 class="modal-title">Beneficiarios</h4>
//                     </div>
//                     <div class="modal-body">
//                         <form 
//                             id="formCadastroBeneficiario" 
//                             method="post" 
//                         >
//                             <div class="row" style="position: relative;">
//                                 <div class="col-sm-5">
//                                     <div class="form-group">
//                                         <label for="CPF">CPF:</label>
//                                         <input required type="text" class="form-control" id="CPF-beneficiario" name="CPF" placeholder="Ex.: 123.453.789-00"
//                                             data-mask="999.999.999-99" minlength="14"/>
//                                     </div>
//                                 </div>
//                                 <div class="col-sm-5">
//                                     <div class="form-group">
//                                         <label for="Nome">Nome:</label>
//                                         <input required type="text" class="form-control" id="Nome-beneficiario" name="Nome" placeholder="Ex.: João"
//                                             maxlength="50"/>
//                                     </div>
//                                 </div>
//                                 <div class="col-sm-2 mt-auto text-center" style="position: absolute;right: 0;bottom: 0;">
//                                     <div class="form-group">
//                                         <button type="button" id="submit" class="btn btn-sm btn-success">Incluir</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                         <div class="scroll-content">
//                             <table id="gridBeneficiarios" class="table beneficiario"></table>
//                         </div>
//                     </div>
//                     <div class="modal-footer">
//                         <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
//                     </div>
//                 </div><!-- /.modal-content -->
//             </div><!-- /.modal-dialog -->
//         </div> <!-- /.modal -->
//     `
//     $('body').append(texto);
//     $('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>');

//     $('#submit').on("click", () => {
//         if (IsEdit) {
//             IsEdit = false
//             return alterar(Beneficiario)
//         }
//         incluir();
//     });

//     $('#beneficiarioModal').modal('show');
// }


$(document).ready(function () {
    // $('#beneficiarioButton').on("click", () => {
    //     if (!IsEditCliente_GLOBAL) {
    //         CurrentClienteId_GLOBAL = null
    //         BeneficiariosList_GLOBAL = []
    //         SetList();
    //     }
    //     ModalBeneficiario()
    // });
})
