export let branches: string[];
export let plugins: (string | (string | {
    changelogFile: string;
})[] | (string | {
    assets: string[];
    message: string;
})[])[];
