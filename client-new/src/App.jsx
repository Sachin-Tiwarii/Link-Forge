  import { useState } from "react";
  import { Link2, ArrowUpRight, Copy, Check, Zap } from "lucide-react";
  import { QRCodeSVG } from "qrcode.react";
  import ChainAnimation from "./components/ChainAnimation";
  import "./App.css";

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  export default function App() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    async function handleShorten(event) {
      event.preventDefault();
      setError("");
      setResult("");
      setCopied(false);

      let parsedUrl;

      try {
        parsedUrl = new URL(url.trim());
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        setError("Please enter a valid URL starting with http:// or https://");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(`${API_URL}/api/shorten`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalUrl: parsedUrl.href }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to shorten this URL.");
        }

        setResult(data.data.shortUrl);
      } catch (err) {
        setError(
          err.message === "Failed to fetch"
            ? "Cannot connect to the backend. Check that your server is running on port 5000."
            : err.message
        );
      } finally {
        setLoading(false);
      }
    }

    async function copyLink() {
      try {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        setError("Clipboard access failed. Please copy the link manually.");
      }
    }

    return (
      <div className="app-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <main>
          <section className="hero" id="home">
            {/* Brand name, top left */}
            <a className="wordmark" href="#home">
              Link<span>Forge</span>
            </a>

            {/* Text on the left, animation on the right */}
            <div className="hero-content-row">
              <div className="hero-copy">
                <h1>
                  Long links.
                  <br />
                  <span className="headline-accent">Forged</span> into
                  <br />
                  something shorter.
                </h1>

                <p className="hero-description">
                  Turn long, messy URLs into clean, memorable links. Shorten any
                  link and instantly generate a QR code for easy sharing,
                  anytime, anywhere.
                </p>
              </div>

              <div className="hero-visual">
                <ChainAnimation />
              </div>
            </div>

            {/* Main block below both, centered */}
            <div className="shortener-card" id="shorten">
              <form onSubmit={handleShorten}>
                <label htmlFor="url-input">Paste your destination URL</label>
                <div className="input-row">
                  <Link2 size={20} className="input-icon" />
                  <input
                    id="url-input"
                    type="url"
                    placeholder="https://your-very-long-url.com/..."
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    required
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? "Forging..." : "Shorten link"}
                    {!loading && <ArrowUpRight size={17} />}
                  </button>
                </div>
              </form>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}

              {result && (
                <div className="result-panel">
                  <div className="result-copy">
                    <a href={result} target="_blank" rel="noreferrer">
                      {result}
                    </a>
                    <button
                      type="button"
                      className="copy-button"
                      onClick={copyLink}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                  </div>

                  <div className="qr-panel">
                    <QRCodeSVG value={result} size={100} level="M" />
                    <span>SCAN TO OPEN</span>
                  </div>
                </div>
              )}

              <div className="card-footer">
                <span>
                  <Zap size={14} /> Fast. Simple. Reliable.
                </span>
                <span>No sign-up required</span>
              </div>
            </div>
          </section>

          <section className="features" id="features">
            <div className="features-heading">
              <span className="section-kicker">MADE FOR SHARING</span>
              <h2>
                Small links. <span>Big possibilities.</span>
              </h2>
              <p>Everything you need to make your links easier to share.</p>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <span className="feature-icon">
                  <Link2 size={22} />
                </span>
                <h3>Short & shareable</h3>
                <p>
                  Transform lengthy URLs into compact links that are easy to copy
                  and share.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <Zap size={22} />
                </span>
                <h3>Quick redirects</h3>
                <p>
                  Send people straight to the destination with your existing
                  LinkForge backend.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <Copy size={22} />
                </span>
                <h3>QR codes included</h3>
                <p>
                  Every generated link comes with a QR code, ready for screens or
                  print.
                </p>
              </article>
            </div>
          </section>
        </main>

       
<footer className="footer">
  <a className="footer-brand" href="#home">
    LinkForge
  </a>

  <p className="footer-copyright">
    © {new Date().getFullYear()} LinkForge. Built to connect.
    <span className="footer-credit"> Crafted by Sachin Tiwari.</span>
  </p>

</footer>

      </div>
    );
  }