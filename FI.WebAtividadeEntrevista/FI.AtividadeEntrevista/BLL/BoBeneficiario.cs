using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using FI.AtividadeEntrevista.DML;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Consulta o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long id)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.Consultar(id);
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Beneficiario> Listar()
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.Listar();
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Beneficiario> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, int IDCLIENTE, out int qtd)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, IDCLIENTE, out qtd);
        }

        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Alterar(beneficiario);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            cli.Excluir(id);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns>DataRowCollection</returns>
        public List<DML.Beneficiario> VerificarExistencia(string CPF)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.VerificarExistencia(CPF);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns>DataRowCollection</returns>
        public bool VerificarExistencia(string CPF, bool overload)
        {
            DAL.DaoBeneficiario cli = new DAL.DaoBeneficiario();
            return cli.VerificarExistencia(CPF, overload);
        }

        /// <summary>
        /// VerificarValidade
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns>bool</returns>
        public bool VerificarValidade(string CPF)
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