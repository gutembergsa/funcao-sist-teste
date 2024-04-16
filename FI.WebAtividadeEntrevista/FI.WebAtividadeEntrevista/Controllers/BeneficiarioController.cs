using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web.Mvc;
using System.Text;
using WebAtividadeEntrevista.Models;
using Newtonsoft.Json;
using System.Data;
using System.Web.UI.WebControls;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        private static List<Beneficiario> beneficiarios = new List<Beneficiario>();

        [HttpPost]
        public JsonResult List(int jtStartIndex = 0, int jtPageSize = 1, string jtSorting = null, int IDCLIENTE = 0)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), IDCLIENTE, out qtd);

                return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Incluir(List<BeneficiarioModel> models, int Id)
        {
            try
            {

                BoBeneficiario bo = new BoBeneficiario();

                foreach (var model in models)
                {
                    List<FI.AtividadeEntrevista.DML.Beneficiario> CPFAlreadyExist = bo.VerificarExistencia(model.CPF);
                    bool CPFIsValid = bo.VerificarValidade(model.CPF);

                    bool CPFFromSameCliente = CPFAlreadyExist.Any(obj => obj.IDCLIENTE == Id);

                    if (!CPFIsValid || CPFFromSameCliente)
                    {
                        Response.StatusCode = 400;
                        return Json(string.Join(Environment.NewLine, "CPF de beneficario(a) " + model.Nome + " é invalido"));
                    }

                    if (!this.ModelState.IsValid)
                    {
                        List<string> erros = (from item in ModelState.Values
                                              from error in item.Errors
                                              select error.ErrorMessage).ToList();
                        Response.StatusCode = 400;
                        return Json(string.Join(Environment.NewLine, erros));
                    }

                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        Nome = model.Nome,
                        CPF = model.CPF,
                        IDCLIENTE = Id
                    });
                }

                //return Json(models);
                return Json("Beneficiario cadastrado com sucesso");

            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Alterar(List<BeneficiarioModel> models, int Id)
        {
            try
            {

                BoBeneficiario bo = new BoBeneficiario();

                foreach (var model in models)
                {
                    List<FI.AtividadeEntrevista.DML.Beneficiario> CPFAlreadyExist = bo.VerificarExistencia(model.CPF);
                    bool CPFIsValid = bo.VerificarValidade(model.CPF);

                    bool CPFFromSameCliente = CPFAlreadyExist.Any(obj => obj.IDCLIENTE == Id);

                    if (!CPFIsValid || !CPFFromSameCliente && CPFAlreadyExist.Count > 0)
                    {
                        Response.StatusCode = 400;
                        return Json(string.Join(Environment.NewLine, "CPF de beneficario(a) " + model.Nome + " é invalido"));
                    }

                    if (!this.ModelState.IsValid)
                    {
                        List<string> erros = (from item in ModelState.Values
                                              from error in item.Errors
                                              select error.ErrorMessage).ToList();

                        Response.StatusCode = 400;
                        return Json(string.Join(Environment.NewLine, erros));
                    }

                    bo.Alterar(new Beneficiario()
                    {
                        Id = model.Id,
                        Nome = model.Nome,
                        CPF = model.CPF,
                        IDCLIENTE = model.IDCLIENTE

                    });
                }
                return Json("Beneficiario alterado com sucesso");
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Excluir(int Id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            bo.Excluir(Id);
            return Json("Exclusão efetuada com sucesso");
        }

        [HttpPost]
        public JsonResult GetListData()
        {
            return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = 1 }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SetListData(string data)
        {
            if (data == null)
            {
                return Json("");
            }
            beneficiarios = JsonConvert.DeserializeObject<List<Beneficiario>>(data);
            return Json(new { success = true });
        }
    }
}