<?php





$search = $_POST["search"];




$host = "localhost";
$dbname = "scholarBase";
$username = "postgres";
$password = "Tsuki0607!!";



$conn_string = "host=$host dbname=$dbname user=$username password=$password";
$conn = pg_connect($conn_string);

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

// echo "Connection successful. ";




// Prepare and execute the query
$query = "SELECT *,
        ts_rank(to_tsvector(article_name || ' ' || coalesce(abstract,  '')), websearch_to_tsquery($1)) as rank
        FROM articles
        WHERE to_tsvector(article_name || ' ' || coalesce(abstract,  '')) @@ websearch_to_tsquery($1)
        ORDER BY rank desc";



$result = pg_query_params($conn, $query, array($search));

if (!$result) {
    die("Error in SQL query: " . pg_last_error());
} else {
    // Check if any rows were returned
    if (pg_num_rows($result) > 0) {
        // Start a table to display the results
        echo "<table border='1'>
                <tr>
                    <th>DOI</th>
                    <th>Article Name</th>
                    <th>Abstract</th>
                    
                </tr>";

        // Loop through the results and display each row
        while ($row = pg_fetch_assoc($result)) {
            echo "<tr>
                    <td>" . htmlspecialchars($row['doi']) . "</td>
                    <td>" . htmlspecialchars($row['article_name']) . "</td>
                    <td>" . htmlspecialchars($row['abstract']) . "</td>
                    
                  </tr>";
        }

        echo "</table>";
    } else {
        // No results found for the search
        echo "No articles found for the search term '" . htmlspecialchars($search) . "'.";
    }
}

// Close the connection
pg_close($conn);