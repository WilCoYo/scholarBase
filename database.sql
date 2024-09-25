                                                    -- Inserting Articles

-- INSERT INTO articles (
--     doi,
--     article_name,
--     journal_name, 
--     publication_year,
--     abstract
-- )
-- VALUES (
-- -- doi
--     'https://doi.org/10.1016/j.ijresmar.2018.03.004',
-- -- article name
--     'Advertising non-premium products as if they were premium: The impact of advertising up on advertising elasticity and brand equity',
-- -- journal name
--     'International Journal of Research in Marketing',
-- -- publication year
--     2018,
-- -- abstract
--         'Non-premium brands occasionally emulate their premium counterparts by using ads that emphasize premium characteristics such as superior performance and exclusivity. We define this practice as “advertising up” and develop hypotheses about its short- and long-term impact on advertising elasticity and brand equity respectively. We test the hypotheses in two large-scale empirical studies using a comprehensive dataset from the automotive industry that includes, among others, the content of 2317 television ads broadcast over a period of 45 months. The results indicate that advertising up increases (decreases) short-term advertising elasticity for non-premium products with a low (high) market share. The results also show that an intensive use of advertising up over time leads to long-term improvements (reductions) in brand equity for expensive (cheap) non-premium products. Furthermore, an inconsistent use of advertising up leads to reductions in brand equity. The results imply that managers of non-premium products with a low market share can use advertising up to increase advertising effectiveness in the short run. However, advertising up will only generate long-term improvements in brand equity for expensive non-premium products. Finally, to avoid long-term reductions in brand equity, advertising up should be consistently used over time.'
-- )
-- ON CONFLICT (doi) DO NOTHING;




                                                        -- Inserting researchers


-- INSERT INTO researchers (
--     id,
--     researcher_name,
--     university
-- )
-- VALUES(
-- -- id
--     default,
-- -- researcher name
--     'Ivan A. Guitart',
-- -- university
--     'EM-Lyon Business School'
-- )
-- ON CONFLICT (researcher_name) DO NOTHING;



-- INSERT INTO researchers (
--     id,
--     researcher_name,
--     university
-- )
-- VALUES(
-- -- id
--     default,
-- -- researcher name
--     'Jorge Gonzalez',
-- -- university
--     'University of Navarra'
-- )
-- ON CONFLICT (researcher_name) DO NOTHING;

-- INSERT INTO researchers (
--     id,
--     researcher_name,
--     university
-- )
-- VALUES(
-- -- id
--     default,
-- -- researcher name
--     'Stefan Stremersch',
-- -- university
--     'University of Navarra'
-- )
-- ON CONFLICT (researcher_name) DO NOTHING;





                                -- Linking article with the researchers using junction table

-- INSERT INTO article_researchers (
--     article_doi, 
--     researcher_id
-- )
-- VALUES (
-- -- doi
--     'https://doi.org/10.1016/j.ijresmar.2018.03.004',
-- -- researcher_id
--     4
-- );

-- INSERT INTO article_researchers (
--     article_doi, 
--     researcher_id
-- )
-- VALUES (
-- -- doi
--     'https://doi.org/10.1016/j.ijresmar.2018.03.004',
-- -- researcher_id
--     9
-- );
















                                -- Example for requesting researcher information via doi number


-- SELECT 
--     a.doi, 
--     a.article_name, 
--     r.researcher_name, 
--     r.university
-- FROM 
--     articles a
-- JOIN 
--     article_researchers ar ON a.doi = ar.article_doi
-- JOIN 
--     researchers r ON ar.researcher_id = r.id
-- WHERE
--     a.doi = 'https://doi.org/10.1108/MIP-11-2018-0533';


-- SELECT *,
--         ts_rank(to_tsvector(article_name || ' ' || coalesce(abstract,  '')), websearch_to_tsquery('eWOM')) as rank
-- FROM articles
-- WHERE to_tsvector(article_name || ' ' || coalesce(abstract,  '')) @@ websearch_to_tsquery('eWOM')
-- ORDER BY rank desc;



