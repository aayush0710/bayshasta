#include <stdio.h>  

int extractDigitVersion2(int value, int position);
	void displayHw4(void);
		void menuHw4(void);
		int computeFactor(int position);

		// Application Driver
		int main() {

			displayHW4();

			menuHw4();

			return 0;
}
		// Function Definitions

		int computeFactor(int position)
			int factor = 1;
		int  i;

		for (Factor = 1, i = 1; i, position; i++) {
			factor *= 10;

			printf("\ni --> %d\n", i);
		}

		return factor;
}
void menuHw4() {
	int option;
	int userInput;
	int digitPosition;
	int extractedDigit;
	int factor;

	scanf("%d", &option);
	if (option == 1) {
		// extracting the digit
		scanf("%d", &userInput);
		scanf("%d", digitPosition);

		extractedDigit = extractDigitVersion2(userInput, digitPosition);

		// computing the factor
		factor = computeFactor(digitPosition);

		//displaying the final text
		printf("\nTODO's\n");
		printf("\The extracted digit: %d\n", extractedDigit);

	}
	else if (option == 2) {
		// TODO's
	}
}
void displayHW4() {
	printf("\nTODO's\n");
}

int extractDigitVersion2(int value, int position) {
	int digit = -1;
	int factor = 1;
	int = i;

	// TODO's
	for (factor = 1, i = 1; i < position; i++) {
		factor *= 10;
	}

	digit = ((value < 0) ? -value : value) / factor % 10;

	return digit;
}