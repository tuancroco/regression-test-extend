function Approve-TestSuite {
  [alias("a")]
  [alias("approve")]
  param (
    # Test suite name
    [Parameter(
      ValueFromPipeline,
      Mandatory)]
    [string]
    $name
  )
  
  regressify approve -- --test-suite $name
}

function Reference-TestSuite {  
  [alias("r")]
  [alias("ref")]
  param (
    # Test suite name
    [Parameter(
      ValueFromPipeline,
      Mandatory)]
    [string]
    $name
  )
  
  regressify ref -- --test-suite $name
}

function Test-TestSuite {
  [alias("t")]
  [alias("test")]
  param (
    # Test suite name
    [Parameter(
      ValueFromPipeline,
      Mandatory)]
    [string]
    $name
  )
  
  regressify test -- --test-suite $name
}
