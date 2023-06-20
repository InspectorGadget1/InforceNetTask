using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class UrlEncoder : IUrlEncoder
    {
        public string Encode(string url)
        {
            const string base58Characters = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
            var base58EncodedString = new StringBuilder();

            // Convert the input string to bytes
            byte[] bytes = Encoding.UTF8.GetBytes(url);

            // Convert the bytes to a BigInteger for easier manipulation
            BigInteger number = new BigInteger(bytes.Reverse().ToArray());

            // Convert the BigInteger to base58 representation
            while (number > 0 && base58EncodedString.Length < 6)
            {
                int remainder = (int)(number % 58);
                base58EncodedString.Insert(0, base58Characters[remainder]);
                number /= 58;
            }

            // Pad the output with leading characters if necessary
            while (base58EncodedString.Length < 6)
            {
                base58EncodedString.Insert(0, base58Characters[0]);
            }

            // Take only the first 6 characters from the base58 encoded string
            return base58EncodedString.ToString().Substring(0, 6);
        }
    }
}
