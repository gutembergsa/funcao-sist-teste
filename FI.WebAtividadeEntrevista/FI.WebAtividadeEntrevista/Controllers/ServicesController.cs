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
        private (string, string) Type = ("cliente", "beneficiario");

        [HttpPost]
        public JsonResult CheckCPFList(List<CPFValidatorModel> CPFList)
        {
            if (CPFList != null)
            {

                BoCliente boCliente = new BoCliente();
                BoBeneficiario boBeneficiario = new BoBeneficiario();

                foreach (var CPFData in CPFList)
                {
                    bool CPFIsValid = this.VerificarValidade(CPFData.CPF);

                    if (CPFData.Type == Type.Item1)
                    {
                        bool CPFAlreadyExist = boCliente.VerificarExistencia(CPFData.CPF);

                        if (!CPFIsValid || CPFAlreadyExist)
                        {
                            Response.StatusCode = 400;
                            return Json(new { isValid = false, Message = "CPF do cliente é inválido" });
                        }
                    }

                    if (CPFData.Type == Type.Item2)
                    {
                        bool CPFAlreadyExist = boBeneficiario.VerificarExistencia(CPFData.CPF, true);
                        if (!CPFIsValid)
                        {
                            Response.StatusCode = 400;
                            return Json(new { isValid = false, Message = "CPF do beneficiario é inválido" });
                        }
                    }
                }
            }
            return Json(new { isValid = true });
        }

        private bool VerificarValidade(string CPF)
        {
            if (string.IsNullOrWhiteSpace(CPF))
            {
                return false;
            }

            CPF = CPF.Replace(".", "").Replace("-", "");

            if (CPF.Length != 11 || CPF.Distinct().Count() == 1)
            {
                return false;
            }

            int[] factors1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] factors2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            Func<string, int, int> calculateDigit = (CPFString, length) =>
            {
                int sum = 0;
                for (int i = 0; i < length; i++)
                {
                    sum += int.Parse(CPFString[i].ToString()) * (length + 1 - i);
                }
                int remainder = sum % 11;
                return remainder < 2 ? 0 : 11 - remainder;
            };

            int digit1 = calculateDigit(CPF, 9);
            int digit2 = calculateDigit(CPF, 10);

            return int.Parse(CPF[9].ToString()) == digit1 && int.Parse(CPF[10].ToString()) == digit2;
        }
    }
}