using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoCliente
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public long Incluir(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Incluir(cliente);
        }

        /// <summary>
        /// Altera um cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Alterar(cliente);
        }

        /// <summary>
        /// Consulta o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public DML.Cliente Consultar(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Consultar(id);
        }

        /// <summary>
        /// Excluir o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Listar()
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Listar();
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns>bool</returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.VerificarExistencia(CPF);
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
