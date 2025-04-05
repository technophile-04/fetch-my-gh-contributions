const username = "technophile-04";
const start = "2025-03-16";
const end = "2025-04-05";

const token = process.env.GITHUB_TOKEN;
const headers = {
  Authorization: `token ${token}`,
};

interface PR {
  title: string;
  number: number;
  html_url: string;
}

interface Review {
  title: string;
  number: number;
  html_url: string;
  state: string;
}

interface RepoPRs {
  [key: string]: PR[];
}

interface RepoReviews {
  [key: string]: Review[];
}

async function fetchMergedPRs(startDate: string, endDate: string) {
  try {
    const args = process.argv.slice(2);
    const flags = args.filter((arg) => arg.startsWith("--"));
    const isCompact = flags.includes("--compact");
    const isWithoutReviewLink = flags.includes("--no-review-link");

    // Fetch merged PRs
    const prResponse = await fetch(
      `https://api.github.com/search/issues?q=+type:pr+author:${username}+is:merged+created:${startDate}..${endDate}`,
      { headers }
    );
    const prData = await prResponse.json();
    const prsByRepo: RepoPRs = {};

    prData?.items?.forEach((pr: any) => {
      const repoName = pr.repository_url.replace(
        "https://api.github.com/repos/",
        ""
      );
      if (!prsByRepo[repoName]) {
        prsByRepo[repoName] = [];
      }
      prsByRepo[repoName].push({
        title: pr.title,
        number: pr.number,
        html_url: pr.html_url,
      });
    });

    // Fetch ongoing PRs
    const ongoingResponse = await fetch(
      `https://api.github.com/search/issues?q=+type:pr+author:${username}+is:open+created:${startDate}..${endDate}`,
      { headers }
    );
    const ongoingData = await ongoingResponse.json();
    const ongoingPRsByRepo: RepoPRs = {};

    ongoingData?.items?.forEach((pr: any) => {
      const repoName = pr.repository_url.replace(
        "https://api.github.com/repos/",
        ""
      );
      if (!ongoingPRsByRepo[repoName]) {
        ongoingPRsByRepo[repoName] = [];
      }
      ongoingPRsByRepo[repoName].push({
        title: pr.title,
        number: pr.number,
        html_url: pr.html_url,
      });
    });

    // Fetch reviews
    const reviewResponse = await fetch(
      `https://api.github.com/search/issues?q=+type:pr+reviewed-by:${username}+created:${startDate}..${endDate}`,
      { headers }
    );
    const reviewData = await reviewResponse.json();
    const reviewsByRepo: RepoReviews = {};

    reviewData?.items?.forEach((review: any) => {
      const repoName = review.repository_url.replace(
        "https://api.github.com/repos/",
        ""
      );
      if (!reviewsByRepo[repoName]) {
        reviewsByRepo[repoName] = [];
      }
      reviewsByRepo[repoName].push({
        title: review.title,
        number: review.number,
        html_url: review.html_url,
        state: review.state,
      });
    });

    for (const repo in prsByRepo) {
      if (isCompact) {
        const prNumbers = prsByRepo[repo].map((pr) => `#${pr.number}`);
        console.log(`${repo.split("/")[1]}: ${prNumbers.join(", ")}`);

        if (ongoingPRsByRepo[repo]) {
          const ongoingNumbers = ongoingPRsByRepo[repo].map(
            (pr) => `#${pr.number}`
          );
          console.log(`Ongoing PRs: ${ongoingNumbers.join(", ")}`);
        }

        if (reviewsByRepo[repo]) {
          const reviewNumbers = reviewsByRepo[repo].map(
            (review) => `#${review.number}`
          );
          console.log(`Reviews: ${reviewNumbers.join(", ")}`);
        }

        !isWithoutReviewLink &&
          console.log(
            `Review Link: https://github.com/${repo}/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3A${username}+merged%3A${startDate}..${endDate}+`
          );
        console.log("----\n");
      } else {
        console.log(`-----------------------------------------`);
        console.log(`${repo.split("/")[1]}: ${repo}\n`);

        console.log("Merged PRs:");
        prsByRepo[repo].forEach((pr) => {
          console.log(`---- ${pr.title}: #${pr.number}`);
        });

        if (ongoingPRsByRepo[repo]) {
          console.log("\nOngoing PRs:");
          ongoingPRsByRepo[repo].forEach((pr) => {
            console.log(`---- ${pr.title}: #${pr.number}`);
          });
        }

        if (reviewsByRepo[repo]) {
          console.log("\nReviews:");
          reviewsByRepo[repo].forEach((review) => {
            console.log(
              `---- ${review.title}: #${review.number} (${review.state})`
            );
          });
        }

        !isWithoutReviewLink &&
          console.log(
            `\nReview Link: https://github.com/${repo}/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3A${username}+merged%3A${startDate}..${endDate}+`
          );
        console.log(`-----------------------------------------\n`);
        console.log("\n");
      }
    }
  } catch (error) {
    console.error("Error fetching PRs and reviews:", error);
  }
}

fetchMergedPRs(start, end);
