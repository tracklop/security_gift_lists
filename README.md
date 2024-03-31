# security_gift_lists

###### Otuszewski Hugo ● Gosselin Sébastien

Le fichier `.env` doit aller dans le dossier `./docker/app/`.

---

-   Utilisation de `husky` et `jest` pour effectuer les tests avant chaque commit.
-   Utilisation de `dependabot` pour vérification des dépendances, mise à jour et corrections tous les jours.
-   Intégraion d'une pipeline CI pour build l'application si possible et exécuter les tests.
-   Utilisation de `GitHub CodeQL analysis` pour vérifier la qualité du code à chaque `push` ou `pull request` sur la branche `main`.
-   Utilisation de `Github Secret scanning` pour vérifier si des mots de passe, des tokens ou autre sont en clair à chaque commit.
