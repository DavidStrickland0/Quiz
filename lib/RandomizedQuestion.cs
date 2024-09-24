using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lib
{
    public class RandomizedQuestion
    {
        public bool isMultiple { get; set; }

        public int Index { get; set; }
        public string text { get; set; }
        public List<string> answers { get; set; }
    }
}
