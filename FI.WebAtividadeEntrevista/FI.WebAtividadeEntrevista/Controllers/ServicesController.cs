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
    public class ServicesController : Controller
    {
        (string, string) Type = ("cliente", "beneficiario");

        [HttpPost]
        public JsonResult CheckCPFList(List<CPFValidatorModel> CPFList)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            foreach (var CPFData in CPFList)
            {
                if (CPFData.Type == Type.Item1)
                {
                    bool CPFAlreadyExist = boCliente.VerificarExistencia(CPFData.CPF);
                    bool CPFIsValid = boCliente.VerificarValidade(CPFData.CPF);

                    if (!CPFIsValid || CPFAlreadyExist)
                    {
                        Response.StatusCode = 400;
                        return Json(new { isValid = false, Message = "CPF do cliente é inválido" });
                    }

                }

                if (CPFData.Type == Type.Item2)
                {
                    bool CPFAlreadyExist = boBeneficiario.VerificarExistencia(CPFData.CPF, true);
                    bool CPFIsValid = boBeneficiario.VerificarValidade(CPFData.CPF);

                    if (!CPFIsValid || CPFAlreadyExist)
                    {
                        Response.StatusCode = 400;
                        return Json(new { isValid = false, Message = "CPF do beneficiario é inválido" });
                    }
                }
            }
            return Json(new { isValid = true });
        }

    }
}