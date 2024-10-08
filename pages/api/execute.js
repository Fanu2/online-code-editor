import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { code, language } = req.body;

      console.log("Received language:", language);
      console.log("Received code:", code);

      let result;

      if (language === 'javascript') {
        result = eval(code); // Note: This is unsafe for production!
      } else if (language === 'python') {
        // Use single quotes for the outer string and escape double quotes inside
        const pythonCode = `
import sys
from io import StringIO

# Redirect stdout to capture print statements
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
    exec('''${code.replace(/'/g, "\\'")}''')  # Execute the received Python code
    output = sys.stdout.getvalue()  # Get the output from print statements
except Exception as e:
    output = str(e)

sys.stdout = old_stdout  # Restore stdout
print(output)  # Print the output for the API response
`;

        const { stdout, stderr } = await execPromise(`python3 -c "${pythonCode.replace(/"/g, '\\"')}"`);
        
        if (stderr) {
          throw new Error(stderr);
        }
        result = stdout.trim();  // Capture and trim the output
      } else {
        return res.status(400).json({ error: 'Unsupported language' });
      }

      res.status(200).json({ output: result });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
