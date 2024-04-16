


using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de CPFValidatorModel
    /// </summary>
    public class CPFValidatorModel
    {
        private string _tipo;

        /// <summary>
        /// Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Type
        /// </summary>
        [Required]
        public string Type
        {
            get { return _tipo; }
            set
            {
                if (value == "cliente" || value == "beneficiario")
                {
                    _tipo = value;
                }
                else
                {
                    throw new ArgumentException("O valor de Type deve ser 'cliente' ou 'beneficiario'.");
                }
            }
        }

        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        public string CPF { get; set; }

        /// <summary>
        /// IDCLIENTE
        /// </summary>
        public long IDCLIENTE { get; set; }

    }
}