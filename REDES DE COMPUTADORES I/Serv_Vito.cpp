#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock.h>

#define LOCAL_SERVER_PORT 2022
#define TAM_BUFFER 1024

int main() {
    WSADATA wsaData;
    SOCKET sock;
    struct sockaddr_in servAddr, cliAddr;
    int cliLen = sizeof(cliAddr);
    char buffer[TAM_BUFFER];
    int num_bytes_recebidos, num_bytes_enviados;

    float numeros[1000];
    int qtd_numeros = 0;
    float resultado;
    char resposta[100];
    
    struct dados {
  	char buffer[1001];
  	int flag;
  } dados;

    WSAStartup(MAKEWORD(2,1), &wsaData);

    // Criar socket
    sock = socket(AF_INET, SOCK_DGRAM, 0);
    if (sock < 0) {
        printf("Erro ao criar socket\n");
        exit(1);
    }

    // Bind do socket
    servAddr.sin_family = AF_INET;
    servAddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servAddr.sin_port = htons(LOCAL_SERVER_PORT);

    if (bind(sock, (struct sockaddr *) &servAddr, sizeof(servAddr)) < 0) {
        printf("Erro no bind\n");
        exit(1);
    }

    printf("Servidor aguardando mensagens na porta %d...\n", LOCAL_SERVER_PORT);

    // Recebe dados do cliente
    num_bytes_recebidos = recvfrom(sock, (char*)&dados, sizeof(dados), 0, (struct sockaddr *)&cliAddr, &cliLen);
    if (num_bytes_recebidos < 0) {
        printf("Erro ao receber dados\n");
        exit(1);
    }
    
    // apenas para conferir os dados recebidos
    printf("Dados recebido:\n%s\n", dados.buffer);
    
    char*linha = strtok(dados.buffer, "\n");
    while(linha!= NULL && qtd_numeros <1000 ){
    	sscanf(linha, "%f", &numeros[qtd_numeros]);
    	qtd_numeros++;
    	linha = strtok(NULL, "\n");
	}
    

    switch (dados.flag) {
    case 1: // Soma
        resultado = 0;
        for (int i = 0; i < qtd_numeros; i++) {
            resultado = resultado + numeros[i];
        }
        sprintf(resposta, "Resultado da soma: %.5f", resultado);
        break;

    case 2: // Média
        resultado = 0;
        for (int i = 0; i < qtd_numeros; i++) {
            resultado = resultado + numeros[i];
        }
        resultado = resultado / qtd_numeros;
        sprintf(resposta, "Resultado da média: %.5f", resultado);
        break;

    case 3: // Maior e menor número
        {
            float maior = numeros[0];
            float menor = numeros[0];
            for (int i = 1; i < qtd_numeros; i++) {
                if (numeros[i] > maior) maior = numeros[i];
                if (numeros[i] < menor) menor = numeros[i];
            }
            sprintf(resposta, "Maior: %.5f, Menor: %.5f", maior, menor);
        }
        break;

    default:
        sprintf(resposta, "Flag inválida.");
}
    
    // Envia resposta para o cliente
    num_bytes_enviados = sendto(sock, resposta, strlen(resposta), 0, (struct sockaddr *)&cliAddr, cliLen);
    if (num_bytes_enviados < 0) {
        printf("Erro ao enviar resposta ao cliente.\n");
        exit(1);
    }

    printf("Resposta enviada ao cliente: %s\n", resposta);

    closesocket(sock);
    WSACleanup();
    return 0;
}

