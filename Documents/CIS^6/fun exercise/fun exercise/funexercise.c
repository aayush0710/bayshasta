/**
* Program Name: cis6Hw21FunEx2.c
* Discusision: Formatted Outputs with WIDTH Option
*/
#include <stdio.h>

int main() {
	char cVar;
	int iVar;
	double dVar;

	printf("1234567890123456789012345678901234567890\n");
	printf("%8d%8c%10f\n", 23, 'z', 4.1);
	printf("Class Information%\n");
	printf("\n");
	cVar = 'z';
	iVar = 23;
	dVar = 4.1;

	printf("%8c%08d%10.4f\n", cVar, iVar, dVar);
	printf("%-8d%8c\t%10f\n", iVar, cVar, dVar);

	return 0;
}

