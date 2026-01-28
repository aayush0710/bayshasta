/*
 *Program name:cis6testo2
 *Discussion: If and Else
 *Written by: Aayush
 *Date:
 */
#include <stdio.h>
       

	int sum5Int(void);
int sumAllInt(void);

int main() {
	int sum;

	sum = sumAllInt();

	printf("\nThe sum is %d\n", sum);

	return 0;
}

//function Definition

int sumAllInt() {
	int total = 0;
	int starting;
	int ending;
	int i;

	printf("\nEnter the starting value of the interval: ");
	scanf_s("%d", &starting);

	printf("\nEnter the ending value of the interval: ");
	scanf_s("%d", &ending);

	for (i = starting; i <= ending; i++) {
		total += i;
	}

	return total;
}
int sum5Int() {
	int value;
	int total = 0;
	int i;

	for (i = 0; i < 5; i++) {
		printf("\nEnter an int: ");
		scanf_s("%d", &value);

		total += value;
	}
	return total;
}
