export function convertInteger(number: number, signsNum: number = 1): number {
	return Number.isInteger(number) ? number : +number.toFixed(signsNum);
}