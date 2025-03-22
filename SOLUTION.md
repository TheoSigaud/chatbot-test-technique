# SOLUTION

## Structure du projet

Ma solution repose sur un composant principal nommé QueryBuilder, qui orchestre les différentes étapes de la création de requête via des sous-composants. Voici un aperçu de la structure :

 * QueryBuilder : Composant principal qui gère l'état global de la requête et coordonne les sous-composants.

 * OptionsStep : Permet de choisir une option de question parmi celles disponibles.

 * LocationsStep : Permet de sélectionner un ou plusieurs lieux.

 * ItemsStep : Permet de sélectionner un ou plusieurs items.

## Fonctionnalités principales

1. Choix de l'option de question

Affiche une liste d'options disponibles sous forme de radio buttons.

2. Sélection des lieux

Propose une recherche et un filtre basé sur les types des lieux.

Charge dynamiquement les lieux disponibles depuis la base de données.

Prend en charge la sélection multiple.

3. Sélection des items

Propose une recherche et un filtre basé sur les catégories des items.

Charge dynamiquement les items disponibles depuis la base de données.

Prend en charge la sélection multiple.

## Bibliothèques et outils utilisés

1. **shadcn** : Utilisé pour les composants UI réactifs.

2. API dynamique : Chaque sous-composant interagit avec une API backend pour récupérer les données disponibles (options, lieux, items).

3. Gestion d'état : Les états sont gérés de manière centralisée dans QueryBuilder pour garantir une synchronisation entre les sous-composants.



## Exemple de workflow utilisateur

Étape 1 : Sélection d'une question

L'utilisateur choisit une option.

L'interface met à jour dynamiquement les étapes suivantes en fonction des contraintes de cette option.

Étape 2 : Sélection des lieux

Si nécessaire, l'utilisateur peut rechercher et filtrer des lieux.

Étape 3 : Sélection des items

Si requis, l'utilisateur peut filtrer et sélectionner des items.

Finalisation

Une fois toutes les étapes validées, la requête complète générée est affichée à l'utilisateur.