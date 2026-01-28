/**
 * Program Name: floatintype 
 * Discussion: Function with no arguements
 */
#include <stdio.h>


/*Function ptototypes*/
void printClassInfo(void);

void printFloatingPoint(void);

void printExtractDigitAayushG(void);
/*Application driver*/
int main() {
	printf("Class Information --%\n");
	printf("  CIS 6 - Introduction to Programming (C)%\n");
	printf("Laney College%\n");




	printf("Assignment information --%\n");
	printf("Assignment Number:Homework 2%\n");
	printf("                 :Exercise #1%\n)");
	printf("Written by:       Aayush Gautam%\n");
	printf("Due Date:         Wednesday, March 1, 2017%\n");

	printclassInfo();

	printFloatingPoint();

	printExtractDigitAayushG();

	return 0;
}

/* Function definitions*/

/**
* Function Name: printFloating-point()
* Description:   Computing and displaying the floating-point
* Pre:           Nothing
* Post:          Displaying floating-point
*/
void printFloatingPoint() {
	int ivalue;
	printf("\n Computing floatingPoint -- printSquare():\n""\tEnter an integer + ENTER: ");
	scanf("%d", &inputValue);
	printf("\n\tFloatingPoint %d is %d\n", &inputValue);
	return;
}

/**
 * Function Name: printFloatingPoint()
 * Description:   Computing and displaying the floating-point
 * Pre:           Nothing
 * Post:          None
 */
void printSumTwoInt() {
	int i5;
	int i8;
	printf("\n Computing floating-point of two int's -- printFloatingPointInt():\n""\tEnter an integer + ENTER: ");
	scanf("%d, &i5");
	printf("\tEnter an integer + ENTER:");
	scanf("%d", &i8);
	printf("\n\tThe sum of %d and %d is %d\n", i5, i8,);
	return;
}