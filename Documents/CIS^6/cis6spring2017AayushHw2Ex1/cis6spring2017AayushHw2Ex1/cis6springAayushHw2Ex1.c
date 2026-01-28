/**
* Program Name: cis6Hw2FunEx1.c
* Discussion: Formatted Outputs
*/

#include <stdio.h>

int main() {
	char cVar;
	int iVar;
	double dVar;

	printf("1234567890123456789\n");
	printf("%d%c%f\n", 23, 'z', 4.1);
	printf("%c%d%f\n", 23, 'z', 4.1);
	printf("%c%d%f\n", 'z', 23, 4.1);
	printf("%c%f%D\n", 'z', 4.1, 23);
	printf("\n");
	cVar = 'z';
	dVar = 4.1;

	printf("%d%c%F\n", iVar, cVar, dVar);
	printf("%c%d%f\n", iVar, cVar, dVar);
	printf("%c%d%f\n", cVar, iVar, dVar);
	printf("%c%f%d", cVar, dVar, iVar);

	return 0;
}