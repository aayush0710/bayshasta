#include <stdio.h> 
int main() {
	char cVar;
	int iVar;
	double dVar;
	printf("Class Information --%\n");
	printf("  CIS 6 - Introduction to Programming (C)%\n");
	printf("Laney College%\n");


	printf("Assignment information --%\n");
	printf("Assignment Number:Homework 2%\n");
	printf("                 :Exercise #1%\n)");
	printf("Written by:       Aayush Gautam%\n");
	printf("Due Date:         Wednesday, March 1, 2017%\n");


	printf("1234567890123456789012345678901234567890\n");
	printf("%8d%8c%10f\n", 23, 'z', 4.1);
	printf("%8c%8d%10f\n", 0, 122, 4.1);
	printf("%8c%8d%10f\n", 'z', 23, 4.1);
	printf("%8c%10f%8d\n", 'z', 4.1, 23);


	printf("\n");


	cVar = 'z';
	iVar = 23;
	dVar = 4.1;
	printf("%8d%8c%10.6f\n", iVar, cVar, dVar);
	printf("%8c%8d%10.6f\n", 0, 122, dVar);
	printf("%8c0%07d%10.4f\n", cVar, iVar, dVar);
	printf("%8c%010.2f%8d\n", cVar, dVar, iVar);
	printf("%-8d%8c\t%10f\n", iVar, cVar, dVar);
	printf("%-8c%16d\%10f\n", 0, 122, dVar);
	printf("%-8c%08d\%10.4f\n", cVar, iVar, dVar);
	printf("%-8c%010.2f\%8d", cVar, dVar, iVar);
	return 0;
}