<?php
require_once '../config/ConnectionManager.php';

class ItemDAO {

    public function getAllItemCounts() {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT *
            FROM transaction_items
        ";

        $stmt = $pdo->prepare($sql);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $stmt->fetchAll();

            return $rows;
        }
    }

    public function getAllItemDetails() {
        $database = new ConnectionManager();
        $pdo = $database->connect();

        $sql = "
            SELECT *
            FROM items
        ";

        $stmt = $pdo->prepare($sql);

        if ($stmt->execute()) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $rows = $stmt->fetchAll();

            return $rows;
        }
    }
}
?>