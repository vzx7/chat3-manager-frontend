import { useEffect, useState } from 'react';
import { generate } from '@wcj/generate-password';

const PasswordGenerator = ({ cl }: { cl: Function }) => {
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numeric, setNumeric] = useState(true);
  const [special, setSpecial] = useState(true);
  const [length, setLength] = useState(9);
  const opts = { lowerCase, upperCase, numeric, special, length };
  const [password, setPassword] = useState(generate(opts));

  const generateNewPassword = () => {
    const password = generate(opts);
    setPassword(password);
  };

  useEffect(() => {
    cl(password);
  },[password]);

  return (
    <div className="p-7">
      <h3 className="font-medium text-black dark:text-white">Генератор пароля</h3>
      <p className=' p-2 bg-bodydark2 w-full sm:w-1/2 mt-4 mb-8 text-black-2'> {password}</p>
      <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 mb-8" onClick={generateNewPassword}>Generate Password</button>
      <div>
        <label>
          <input type="range" min="9" max="50" value={length} onChange={(evn) => setLength(Number(evn.target.value))} />{' '}
          {length} length of password.
        </label>
        <br />
        <label>
          <input type="checkbox" checked={lowerCase} onChange={() => setLowerCase(!lowerCase)} /> Lower Case
          Letter(a..z)
        </label>
        <br />
        <label>
          <input type="checkbox" checked={upperCase} onChange={() => setUpperCase(!upperCase)} /> Upper Case
          Letter(A..Z)
        </label>
        <br />
        <label>
          <input type="checkbox" checked={numeric} onChange={() => setNumeric(!numeric)} /> Number (0..9)
        </label>
        <br />
        <label>
          <input type="checkbox" checked={special} onChange={() => setSpecial(!special)} /> Special characters
        </label>
      </div>
    </div>
  );
};

export default PasswordGenerator;