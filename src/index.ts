const username = "technophile-04";
const start = "2024-06-01";
const end = "2024-06-30";

const token = process.env.GITHUB_TOKEN;
const headers = {
  Authorization: `token ${token}`,
};

interface PR {
  title: string;
  number: number;
  html_url: string;
}

interface RepoPRs {
  [key: string]: PR[];
}

async function fetchMergedPRs(startDate: string, endDate: string) {
  try {
    const args = process.argv.slice(2);
    const flags = args.filter((arg) => arg.startsWith("--"));
    const isCompact = flags.includes("--compact");
    const isWithoutReviewLink = flags.includes("--no-review-link");

    const response = await fetch(
      `https://api.github.com/search/issues?q=+type:pr+author:${username}+is:merged+created:${startDate}..${endDate}`,
      { headers },
    );
    const data = await response.json();
    const prsByRepo: RepoPRs = {};

    data?.items?.forEach((pr: any) => {
      const repoName = pr.repository_url.replace(
        "https://api.github.com/repos/",
        "",
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

    for (const repo in prsByRepo) {
      if (isCompact) {
        const prNumbers = prsByRepo[repo].map((pr) => `#${pr.number}`);
        console.log(`${repo.split("/")[1]}: ${prNumbers.join(", ")}`);
        !isWithoutReviewLink &&
          console.log(
            `Reviews: https://github.com/${repo}/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3A${username}+merged%3A${startDate}..${endDate}+`,
          );
        console.log("----\n");
      } else {
        console.log(`-----------------------------------------`);
        console.log(`${repo.split("/")[1]}: ${repo}\n`);
        prsByRepo[repo].forEach((pr) => {
          console.log(`---- ${pr.title}: #${pr.number}`);
        });

        !isWithoutReviewLink &&
          console.log(
            `---- Reviews: https://github.com/${repo}/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3A${username}+merged%3A${startDate}..${endDate}+`,
          );
        console.log(`-----------------------------------------\n`);
        console.log("\n");
      }
    }
  } catch (error) {
    console.error("Error fetching PRs:", error);
  }
}

fetchMergedPRs(start, end);
