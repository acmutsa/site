"use client";

import styles from "./page.module.css";

export default function SponsorshipPage() {
  const email = "publicrelationsofficer@acmutsa.org";

  return (
    <main className={styles.page}>
      {/* TOP BLUE SECTION */}
      <div className={styles.topSection}>
        <h1 className={styles.h1}>Sponsor ACM UTSA Today!</h1>

        <div className={styles.container}>
          <div className={styles.top}>
            <h2 className={styles.h2}>Why Sponsor?</h2>
          </div>

          <div className={`${styles.box} ${styles.box1}`}>
            <h3 className={styles.h3}>
              Support a large and growing community of future innovators through
              activation events and workshops
            </h3>
          </div>

          <div className={`${styles.box} ${styles.box2}`}>
            <h3 className={styles.h3}>
              Participate in our annual events such as RowdyHacks, CodeQuantum
              and more
            </h3>
          </div>

          <div className={`${styles.box} ${styles.box3}`}>
            <h3 className={styles.h3}>
              Easily recruit from a large base of talented individuals across
              multiple sectors in tech
            </h3>
          </div>
        </div>
      </div>

      {/* WHITE SECTION */}
      <div className={styles.containerf}>
        <h2 className={styles.interested}>interested?</h2>

        <div className={styles.belowInterested}>
          <h3 className={styles.wantToSponsor}>
            blah blah blah Want to sponsor ACM? Check out our{" "}
            <a className={styles.link} href="x.html">
              Sponsorship Packet!
            </a>
          </h3>

          <button
            type="button"
            className={`${styles.button} ${styles.emailBtn}`}
            onClick={async () => {
              await navigator.clipboard.writeText(email);
            }}
          >
            email copy paste
          </button>

          <a
            href={`mailto:${email}`}
            className={`${styles.button} ${styles.contactUs}`}
          >
            contact us!
          </a>
        </div>

        <h4 className={styles.h4}>
          put dat home page current sponsors section at the bottom b4 footer
        </h4>
      </div>
    </main>
  );
}
