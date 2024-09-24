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
--     'https://doi.org/10.1177/26317877221079340',
-- -- article name
--     'Optimal Distinctiveness: On Being the Same and Different',
-- -- journal name
--     'Organizational Theory',
-- -- publication year
--     2022,
-- -- abstract
--     'Optimal distinctiveness is a theory that emphasizes actors’ drive to be both “the same and different at the same time” (Brewer, 1991, p. 475). Originating as an approach to explain individuals’ self-construals, the theory has expanded over time to embrace the organizational level and beyond, becoming a major area of research where organization theorists and strategy scholars can converse. In this paper, we briefly review the historical and contemporaneous approaches to optimal distinctiveness and note an increasing trend of contextualizing optimal distinctiveness. While encouraging, this trend has fallen short of accounting for four important contingencies that significantly shape optimal distinctiveness and its underpinning mechanisms: organizational hybridity, societal culture, temporal contingencies, and benchmarks for gauging optimal distinctiveness. We discuss these four contingencies and propose corresponding conversation starters to guide future research. These conversation starters have the potential of further enhancing our understanding of optimal distinctiveness, broadening optimal distinctiveness scholarship into new domains, and helping inform and resolve challenges organizations face in pursuing optimal distinctiveness.'
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
--     'Eric Yanfei Zhao',
-- -- university
--     'Indiana University'
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
--     'Mary Ann Glynn',
-- -- university
--     'Boston College'
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
--     'Hatice Aydın',
-- -- university
--     'Mus Alparslan University'
-- )
-- ON CONFLICT (researcher_name) DO NOTHING;





                                -- Linking article with the researchers using junction table

-- INSERT INTO article_researchers (
--     article_doi, 
--     researcher_id
-- )
-- VALUES (
-- -- doi
--     'https://doi.org/10.1177/26317877221079340',
-- -- researcher_id
--     8
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


SELECT *,
        ts_rank(to_tsvector(article_name || ' ' || coalesce(abstract,  '')), websearch_to_tsquery('brand')) as rank
FROM articles
WHERE to_tsvector(article_name || ' ' || coalesce(abstract,  '')) @@ websearch_to_tsquery('brand')
ORDER BY rank desc;