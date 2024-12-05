import os
from docx import Document


def testar_leitura_arquivos(pasta):
    # Itera sobre os arquivos na pasta
    for arquivo in os.listdir(pasta):
        if arquivo.endswith('.docx'):  # Verifica se o arquivo é um .docx
            caminho_arquivo = os.path.join(pasta, arquivo)
            print(f"Lendo arquivo: {arquivo}\n")

            # Abre o arquivo e lê os parágrafos
            doc = Document(caminho_arquivo)
            for paragrafo in doc.paragraphs:
                texto = paragrafo.text.strip()
                if texto:  # Ignora linhas vazias
                    print(texto)
            print("\n" + "-"*40 + "\n")  # Separador entre os arquivos


# Caminho para a pasta com os arquivos .docx
pasta = 'digite aqui seu caminho"

# Testa a leitura dos arquivos
testar_leitura_arquivos(pasta)
