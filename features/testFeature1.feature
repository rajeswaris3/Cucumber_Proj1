@qo_tests
Feature: Thermo Fisher Quick Order

Scenario: Check Quick Order Manual Entry Table

  Given I open Thermo Fisher's home page
  Then the title is "Thermo Fisher Scientific - UK"
  And the Thermo Fisher quick order link exists
  And the Manual entry has 4 columns and 10 rows
  And the expected manual table header is:
      | expected value    |      
      | Catalog number    |
      | Quantity          |      
      | Assay ID          |      
      | Reserve number    |  
  And the column header matches as expected   
  