var MODAL_BENEFICIARIO_CONTENT = `
<div id="beneficiarioModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Beneficiarios</h4>
            </div>
            <div class="modal-body">
                <form 
                    id="formCadastroBeneficiario" 
                    method="post" 
                >
                    <div class="row" style="position: relative;">
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="CPF">CPF:</label>
                                <input required type="text" class="form-control" id="CPF-beneficiario" name="CPF" placeholder="Ex.: 123.453.789-00"
                                    data-mask="999.999.999-99" minlength="14"/>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="Nome">Nome:</label>
                                <input required type="text" class="form-control" id="Nome-beneficiario" name="Nome" placeholder="Ex.: João"
                                    maxlength="50"/>
                            </div>
                        </div>
                        <div class="col-sm-2 mt-auto text-center" style="position: absolute;right: 0;bottom: 0;">
                            <div class="form-group">
                                <button type="button" id="submit" class="btn btn-sm btn-success">Incluir</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="scroll-content">
                    <table id="gridBeneficiarios" class="table beneficiario"></table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div> <!-- /.modal -->
`