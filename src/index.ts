const username = "technophile-04";
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
    const response = await fetch(
      `https://api.github.com/search/issues?q=+type:pr+author:${username}+is:merged+created:${startDate}..${endDate}`,
      { headers },
    );
    const data = await response.json();
    const prsByRepo: RepoPRs = {};

    data.items.forEach((pr: any) => {
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
      console.log(`-----------------------------------------`);
      console.log(`Repository: ${repo}:\n`);
      prsByRepo[repo].forEach((pr) => {
        console.log(`---- ${pr.title}: ${pr.html_url}`);
      });
      console.log(`-----------------------------------------\n`);
      console.log("\n");
    }
  } catch (error) {
    console.error("Error fetching PRs:", error);
  }
}

fetchMergedPRs("2024-02-01", "2024-02-29");