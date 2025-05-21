import Image from "next/image";

const LandingScreen = () => {
  return (
    <div className="section" id="welcome">
      <div className="landing-screen">
        <div className="content">
          <div className="landing-main">
            <div className="slogan slogan-original-container">
              <h2 className="slogan-first-part">
                CBT that fits in your pocket{" "}
                <span className="slogan-hyphen">-</span>
              </h2>
              <h2 className="slogan-second-part">and your routine.</h2>
            </div>
            <Image
              className="relax-image"
              src={"/images/relax-banner.webp"}
              alt={
                "Promotional banner with a man lying on a hammock that looks like WorryFree logo."
              }
              width={0}
              height={0}
              sizes="100%"
            />
            <div className="slogan slogan-split-container">
              <h2 className="slogan-second-part slogan-second-part-split">
                and your routine.
              </h2>
            </div>
          </div>
          <div className="store-links-wrapper">
            <div className="store-links-container">
              <button className="store-link-button">
                <Image
                  src={"/images/app-store-button.webp"}
                  alt={"App Store hyperlink button"}
                  width={0}
                  height={0}
                  sizes="100%"
                  style={{ width: "100%", height: "auto" }}
                />
              </button>
              <button className="store-link-button">
                <Image
                  src={"/images/google-play-button.webp"}
                  alt={"Google Play Store hyperlink button"}
                  width={0}
                  height={0}
                  sizes="100%"
                  style={{ width: "100%", height: "auto" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
