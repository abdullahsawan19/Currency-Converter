import { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./Button";
import Options from "./Options";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  function handleClick() {
    setShowForm(!showForm);
    setResult("");
    setAmount("");
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setShowForm(false);
      }
    }

    if (showForm) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showForm]);

  useEffect(() => {
    if (!amount || !fromCur || !toCur) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      convert();
    }, 400);

    async function convert() {
      setIsLoading(true);

      if (abortRef.current) {
        abortRef.current.abort();
      }

      abortRef.current = new AbortController();

      if (fromCur === toCur) {
        setResult(amount);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
          { signal: abortRef.current.signal }
        );

        const data = await res.json();
        setResult(data.rates[toCur]);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
      }

      setIsLoading(false);
    }

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [amount, fromCur, toCur]);

  return (
    <div className="app-container">
      <div className="header-section">
        <h1>Currency Converter</h1>
        <Button onClick={handleClick}>
          {showForm ? "Close Converter" : "Open Converter"}
        </Button>
      </div>

      {showForm && (
        <div className="converter-card">
          <div className="input-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>

          <div className="row">
            <Options
              label="From"
              value={fromCur}
              onChange={(e) => setFromCur(e.target.value)}
              options={["USD", "EUR", "CAD", "INR"]}
              disabled={isLoading}
            />

            <Options
              label="To"
              value={toCur}
              onChange={(e) => setToCur(e.target.value)}
              options={["USD", "EUR", "CAD", "INR"]}
              disabled={isLoading}
            />
          </div>

          <div className="result-area">
            {amount && (
              <h3>{isLoading ? "Converting..." : `${result} ${toCur}`}</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
