# Cavour Luxury Rooms

Website institucional de Cavour Luxury Rooms, em Lecce. Apresenta as duas acomodações, comodidades e contactos do alojamento.

## Abrir o site

Os arquivos do site ficam em `docs/`, configurada como origem do GitHub Pages. Pode iniciar um servidor local na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois, aceda a <http://localhost:8000/docs/>.

## Páginas

- `docs/index.html` - página inicial
- `docs/sobre.html` - informações sobre o alojamento
- `docs/quartos.html` - Apartamento Deluxe e Quarto Queen Deluxe
- `docs/atividades.html` - comodidades
- `docs/contactos.html` - morada e contactos

## Imagens e logos

- Logo marrom usada no cabeçalho: `docs/assets/images/logos/logo-02.png`.
- Logo branca usada no rodapé e como favicon: `docs/assets/images/logos/logo-03.png`.
- As dez fotos em `docs/assets/images/quartos/apartamento-deluxe/` são mostradas na galeria do Apartamento Deluxe e uma delas também aparece na página inicial.
- As oito fotos em `docs/assets/images/quartos/queen-deluxe/` são mostradas na galeria do Quarto Queen Deluxe.

Para adicionar fotos à galeria, inclua cada caminho como uma miniatura em `docs/quartos.html`. Para alterar telefone e email, edite os campos em `docs/contactos.html` dentro da lista de contactos.
